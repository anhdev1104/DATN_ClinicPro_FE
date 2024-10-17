import { authLogout, refreshToken } from '@/redux/auth/authSlice';
import { store } from '@/redux/store';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

class Http {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.api.interceptors.request.use(
      async config => {
        const accessToken = store.getState().auth.data?.access_token;
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        const errorResponse = error.response.data.message;

        if (errorResponse === 'Token has expired' && error.response.status === 401) {
          try {
            const response = await this.api.post('/auth/refresh');
            store.dispatch(refreshToken(response.data));
            this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
            return this.api(originalRequest);
          } catch (error) {
            store.dispatch(authLogout());
            toast.info('Tài khoản của bạn đã hết phiên đăng nhập !');
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, params?: any) {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async post(url: string, data?: any) {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async update(url: string, data: any) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async delete(url: string, id: string) {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export default Http;
