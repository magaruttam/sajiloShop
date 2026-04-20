export interface LoginRequest {
  email: string;
  password: string;
  role: 'user' | 'vendor';
}

export interface LoginResponse {
  message: string;
  user: { name: string; email: string; role: 'user' | 'vendor' };
  vendor?: {
    id: number;
    userId: number;
    status: string;
    commission_rate: string;
    balance: string;
    shopName: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RegisterRequest {
  name?: string;
  shopName?: string;
  email: string;
  password: string;
  role: 'user' | 'vendor';
}

export interface RegisterResponse {
  message: string;
  user: { name: string; email: string };
}
