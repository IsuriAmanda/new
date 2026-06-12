export type JobStatus =
  | 'PRINTING'
  | 'CUTTING'
  | 'FOLDING'
  | 'BINDING'
  | 'PACKING'
  | 'COMPLETED';

export type JobPriority = 'LOW' | 'MEDIUM' | 'URGENT';
export type JobSource   = 'QUOTATION' | 'DIRECT';

// Matches job_ticket table exactly
export interface JobTicket {
  job_id?:          number;
  job_number?:      string;
  job_name:         string;
  job_type?:        string;
  customer_id?:     number;
  customer_name?:   string;
  quantity?:        number;
  width?:           number;
  height?:          number;
  pages?:           number;
  material?:        string;
  cover_material?:  string;
  binding_id?:      number | null;
  lamination_id?:   number | null;
  machine_id?:      number | null;
  machine_name?:    string;
  remarks?:         string;
  priority?:        JobPriority;
  source?:          JobSource;
  quotation_id?:    number | null;
  status?:          JobStatus;
  department?:      string;
  due_date?:        string;
  created_at?:      string;
}

// Matches job_stage_log table
export interface JobStageLog {
  log_id?:    number;
  job_id:     number;
  stage:      string;
  status:     string;
  remarks?:   string;
  timestamp?: string;
}

// Machine lookup
export interface Machine {
  machine_id: number;
  name:       string;
  width?:     number;
  height?:    number;
}

// Convert quotation to job
export interface ConvertToJobRequest {
  quotation_id: number;
  due_date:     string;
  priority:     JobPriority;
  remarks?:     string;
}

// Create direct job
export interface CreateDirectJobRequest {
  job_name:        string;
  job_type?:       string;
  customer_id:     number;
  quantity?:       number;
  width?:          number;
  height?:         number;
  pages?:          number;
  material?:       string;
  cover_material?: string;
  binding_id?:     number | null;
  lamination_id?:  number | null;
  machine_id?:     number | null;
  remarks?:        string;
  priority?:       JobPriority;
  due_date?:       string;
}