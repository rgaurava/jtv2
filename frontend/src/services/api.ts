import axios from 'axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  Transaction,
  TransactionRequest,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data: LoginRequest) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register', data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post('/auth/reset-password', data),
};

// Transaction API
export const transactionAPI = {
  getAll: () =>
    api.get<Transaction[]>('/transactions'),

  getById: (id: number) =>
    api.get<Transaction>(`/transactions/${id}`),

  create: (data: TransactionRequest) =>
    api.post<Transaction>('/transactions', data),

  update: (id: number, data: TransactionRequest) =>
    api.put<Transaction>(`/transactions/${id}`, data),

  updateStatus: (id: number, status: string) =>
    api.patch<Transaction>(`/transactions/${id}/status`, { status }),

  delete: (id: number) =>
    api.delete(`/transactions/${id}`),
};

export default api;
