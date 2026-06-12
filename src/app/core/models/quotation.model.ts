export type QuotationStatus ='DRAFT' | 'SENT' | 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Quotation {
  id?: number;
  quotation_number?: string | null;
  customer_id?: number;
  base_cost?: number;
  extra_charges?: number;
  profit_margin?: number;
   total_cost?: number;
   status?: QuotationStatus;
   job_name: string;
   dateCreated?: Date | string;  
  customer_name?: string;
  job_type: string;
  associated_job_id?: number | null;

}
export interface QuotationItem {
  item_id?: number;                   
  quotation_id?: number;              
  description?: string;               
  quantity?: number;                  
  width?: number;                     
  height?: number;                    
  pages?: number;                     
  front_color_pages?: number;         
  back_color_pages?: number;          
  cover_front_color_pages?: number;   
  cover_back_color_pages?: number;    
  material_id?: number;               
  cover_material_id?: number;         
  binding_id?: number; 
  laminate_id?: number;               
  unit_cost?: number;                 
  total_cost?: number;                
}
export interface QuotationPayload {
  quotation: Quotation;
  item: QuotationItem;
}
export interface CreateQuotationRequest {
  customer_name: string;    
  email: string;            
  phone: string;     
  job_name: string;        
  job_type: string;
  status: 'DRAFT';          
}