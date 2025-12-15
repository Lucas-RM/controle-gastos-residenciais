import axios, { AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5021';

/**
 * Cliente HTTP configurado para comunicação com a API
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string; errors?: Record<string, string[]> };

      if (status === 400) {
        const message = data.message || 'Erro de validação';
        const errors = data.errors;
        
        if (errors) {
          const errorMessages = Object.values(errors).flat();
          toast.error(errorMessages.join(', ') || message);
        } else {
          toast.error(message);
        }
      } else if (status === 404) {
        toast.error('Recurso não encontrado');
      } else if (status >= 500) {
        toast.error('Erro interno do servidor. Tente novamente mais tarde.');
      } else {
        toast.error(data.message || 'Erro ao processar requisição');
      }
    } else if (error.request) {
      toast.error('Erro de conexão. Verifique se o servidor está em execução.');
    } else {
      toast.error('Erro ao processar requisição');
    }

    return Promise.reject(error);
  }
);

export default apiClient;

