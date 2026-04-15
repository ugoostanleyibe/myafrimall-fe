const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = unknown> {
  error?: string;
  data?: T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      credentials: 'include',
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Something went wrong' };
    }

    return { data };
  } catch {
    return { error: 'Network error. Please try again.' };
  }
}

export const api = {
  register: (payload: RegisterPayload) =>
    request<AuthResponse>('/auth/register', {
      body: JSON.stringify(payload),
      method: 'POST'
    }),

  logIn: (payload: LoginPayload) =>
    request<AuthResponse>('/auth/login', {
      body: JSON.stringify(payload),
      method: 'POST'
    }),

  getMe: (token: string) =>
    request<{ user: User }>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  forgotPassword: (email: string) =>
    request<{ message: string; resetUrl?: string }>('/auth/forgot-password', {
      body: JSON.stringify({ email }),
      method: 'POST'
    }),

  resetPassword: (token: string, password: string) =>
    request<{ message: string }>('/auth/reset-password', {
      body: JSON.stringify({ token, password }),
      method: 'POST'
    }),

  logOut: () => request('/auth/logout', { method: 'POST' }),

  getDashboard: (token: string) =>
    request('/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginPayload {
  password: string;
  email: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  _id: string;
}
