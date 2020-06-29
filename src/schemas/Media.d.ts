export interface IImage {
  id: number;
  entity_id: number;
  entity: string;
  thumb?: any;
  small?: any;
  medium?: any;
  large?: any;
  original: string;
  caption: string;
  default: number;
  status: number;
  created_at: string;
}

export interface IMedia {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}
