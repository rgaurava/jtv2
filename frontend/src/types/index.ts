export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  companyName?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export interface Transaction {
  id: number;
  transactionId: string;
  buyerCompany: string;
  sellerCompany: string;
  productName: string;
  productDescription?: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: TransactionStatus;
  paymentTerms?: string;
  deliveryDate?: string;
  notes?: string;
  aiInsights?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionRequest {
  buyerCompany: string;
  sellerCompany: string;
  productName: string;
  productDescription?: string;
  quantity: number;
  unitPrice: number;
  currency?: string;
  paymentTerms?: string;
  deliveryDate?: string;
  notes?: string;
}
