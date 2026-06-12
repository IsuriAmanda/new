import { Component, ChangeDetectionStrategy, ChangeDetectorRef,OnInit,Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from '../../../../core/services/quotation.service';
import { Quotation,QuotationItem,QuotationPayload ,CreateQuotationRequest } from '../../../../core/models/quotation.model';  


@Component({
  selector: 'app-quotation-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quotation-details.html',
  styleUrls: ['./quotation-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationDetails implements OnInit {
  form;
  primaryData: any = null;
  total = 0;
  isViewMode = false;
  isSaving = false;
  isLoading = true;
  isSendingEmail = false;
  cuttingGrid: number[] = [];
  quotation: Quotation | null = null;

   private quotationId!: number;
  private readonly isBrowser: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private quotationService: QuotationService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form = this.fb.group({
      customerName: [''],
      jobName: [''],
      jobType: [''],
      jobQty: [0],
      jobSizeHeight: [''], 
      jobSizeWidth: [''],
      marginSize: [''],
      pagesQty: [0],
      hpMaterial: [false],
      pagesLeaflets: [''],
      coverMaterial: [''],
      pagesColor: ['none'],
      coverColor: ['none'],
      pagesFrontColor: ['none'],
      pagesBackColor: ['none'],
      coverFrontColor: ['none'],
      coverBackColor: ['none'],
      laminate: ['none'],
      binding: ['none'],
      extraChargesPct: [5],
      profitMarginPct: [10],
      sampleDesign: ['']
    });
  }

  ngOnInit(): void {
    this.quotationId = Number(this.route.snapshot.paramMap.get('id'));

    // Validate ID — if 0 or NaN, go back to list immediately
    if (!this.quotationId) {
      console.error('Invalid quotation ID in URL');
      this.router.navigate(['/quotations']);
      return;
    }

    this.loadQuotation();
  }
private loadQuotation(): void {
    this.quotationService.getQuotationById(this.quotationId).subscribe({
      next: (q) => {
        this.quotation = q;

        // Pre-fill only the fields that were saved in Step 1
        // quantity, width, height come from quotation_item — not available yet
        this.form.patchValue({
          jobName: q.job_name ?? '',
          jobType: q.job_type ?? '',
        });

        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load quotation:', err);
        this.isLoading = false;
        this.router.navigate(['/quotations']);
      }
    });
  }
viewQuotation(): void {
    const v = this.form.getRawValue();

    const colorPrice = (color: string | null | undefined): number => {
      if (color === '4') return 100;
      if (color === '1') return 50;
      return 0;
    };

    // Base cost calculation
    let base = (v.jobQty || 0) * 2;
    if (v.laminate !== 'none') base += 50;
    if (v.binding  !== 'none') base += 75;
    base += colorPrice(v.pagesFrontColor);
    base += colorPrice(v.pagesBackColor);
    base += colorPrice(v.coverFrontColor);
    base += colorPrice(v.coverBackColor);

    // Apply extra charges then profit margin
    const withExtra = base + (base * ((v.extraChargesPct || 0) / 100));
    this.total = withExtra + (withExtra * ((v.profitMarginPct || 0) / 100));

    // Generate cutting grid preview
    const gridCount = Math.min(Math.max(v.jobQty || 6, 2), 12);
    this.cuttingGrid = Array.from({ length: gridCount }, (_, i) => i);

    // Switch to preview mode and disable form
    this.isViewMode = true;
    setTimeout(() => {
      this.form.disable();
      this.cdr.markForCheck();
    }, 0);
  }


  saveQuotation(): void {
    if (this.isSaving) return; // prevent double-click
    this.isSaving = true;

    const v = this.form.getRawValue(); // getRawValue works even when form is disabled

    // Helper: convert color string to int for DB storage
    const colorToInt = (val: string | null | undefined): number => {
      if (val === '4') return 4;
      if (val === '1') return 1;
      return 0;
    };

const bindingMap: Record<string, number | undefined> = {
  none:    undefined,
  center:  1,      // binding_id 1 = Center
  perfect: 2       // binding_id 2 = Perfect
};

const laminationMap: Record<string, number | undefined> = {
  none:  undefined,
  gloss: 1,        // lamination_id 1 = Glossy (small)
  matt:  2         // lamination_id 2 = Matte (small)
};

    // Build the payload — matches QuotationPayload interface exactly
    const payload: QuotationPayload = {

      // Fields that update the `quotation` table
      quotation: {
        id:           this.quotationId,
        job_name:     v.jobName     ?? '',
        job_type:     v.jobType     as 'leaflet' | 'book',
        base_cost:    (v.jobQty || 0) * 2,
        extra_charges: v.extraChargesPct || 0,
        profit_margin: v.profitMarginPct || 0,
        total_cost:   this.total,
        status:       'DRAFT'   // stays DRAFT until manager sends it
      },

      // Fields that insert/update the `quotation_item` table
      item: {
        quotation_id:             this.quotationId,
        description:              v.jobName ?? '',
        quantity:                 v.jobQty  || 0,
        width:                    parseFloat(v.jobSizeWidth ?? '0')  || 0,
        height:                   parseFloat(v.jobSizeHeight ?? '0') || 0,
        pages:                    v.pagesQty || 0,
        front_color_pages:        colorToInt(v.pagesFrontColor),
        back_color_pages:         colorToInt(v.pagesBackColor),
        cover_front_color_pages:  colorToInt(v.coverFrontColor),
        cover_back_color_pages:   colorToInt(v.coverBackColor),
        binding_id:               bindingMap[v.binding   ?? 'none'],
        laminate_id:              laminationMap[v.laminate ?? 'none'],
        total_cost:               this.total
        // material_id, cover_material_id — add when material table is ready
      }
    };

    this.quotationService.saveQuotationDetails(this.quotationId, payload).subscribe({
      next: () => {
        console.log('Quotation saved successfully');
        this.router.navigate(['/quotations']);
      },
      error: (err) => {
        console.error('Failed to save quotation:', err);
        this.isSaving = false; // re-enable button so user can retry
        this.cdr.markForCheck();
      }
    });
  }


sendEmail(): void {
  if (this.isSendingEmail) return;
  this.isSendingEmail = true;
  this.cdr.markForCheck();

  this.quotationService
    .sendQuotationEmail(this.quotationId)
    .subscribe({
      next: () => {
        alert('Email sent successfully to customer');
        this.isSendingEmail = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Email failed:', err);
        alert(err.error?.message || 'Failed to send email');
        this.isSendingEmail = false;
        this.cdr.markForCheck();
      }
    });}

downloadQuotation(): void {
  if (!this.isBrowser) return;

  const url = `http://localhost:3000/api/quotations/${this.quotationId}/pdf`;
  const a = document.createElement('a');
  a.href = url;
  a.download = `quotation-${this.quotationId}.pdf`;
  a.target = '_blank';
  a.click();
}

goBack(): void {
    if (this.isViewMode) {
      // Return to edit mode — don't navigate away
      this.isViewMode = false;
      this.form.enable();
      this.cdr.markForCheck();
    } else {
      this.router.navigate(['/quotations']);
    }
  }
}
