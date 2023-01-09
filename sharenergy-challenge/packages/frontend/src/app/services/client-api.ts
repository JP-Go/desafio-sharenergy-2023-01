import { HttpClientResponse } from '@sharenergy-challenge/shared-types';
import axios, { AxiosInstance } from 'axios';

export const clientApiService = axios.create({
  baseURL: 'http://localhost:3333/api/clients',
});

export async function fetchClients(service: AxiosInstance = clientApiService) {
  const clients = await service.get<HttpClientResponse[]>('');
  return clients.data;
}

export async function sendForm(
  formData: any,
  service: AxiosInstance = clientApiService
) {
  const res = await service.post('', formData);
  return res;
}
