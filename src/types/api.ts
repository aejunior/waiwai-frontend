export interface WordPublic {
  id: number;
  word: string;
  phonemic: string | null;
  categories: Category[];
}

export interface WordDetails extends WordPublic {
  meanings: WordMeaning[];
  attachments: Attachment[];
}

export interface WordMeaning {
  id: number;
  meaning_pt: string;
  meaning_ww: string | null;
  comment_pt: string | null;
  comment_ww: string | null;
  reference: Reference;
}

export interface Category {
  id: number;
  category: string;
}

export interface Reference {
  id: number;
  reference: string;
  url: string | null;
  year: number;
  authors: string;
}

export interface Attachment {
  id: number;
  file_url: string;
  url?: string;
  content_type: string;
  uploaded_at: string;
}

export interface WordCreate {
  word: string;
  phonemic?: string;
  category_ids: number[];
}

export interface WordUpdate {
  word?: string;
  phonemic?: string;
  categories?: number[];
}

export interface MeaningCreate {
  meaning_pt: string;
  meaning_ww?: string;
  comments?: string;
  reference_id: number;
}

export interface MeaningUpdate {
  meaning_pt: string;
  meaning_ww: string;
  comment_pt: string;
  comment_ww: string;
  reference_id: number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface ValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiResponseErrorMessage {
  msg: string;
}

export interface ValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiResponseError {
  detail: ApiResponseErrorMessage | ValidationErrorDetail[];
}
