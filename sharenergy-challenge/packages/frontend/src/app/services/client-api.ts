import { HttpClientResponse } from '@sharenergy-challenge/shared-types';
import axios, { AxiosInstance } from 'axios';

export const clientApiService = axios.create({
  baseURL: 'http://localhost:3333/api/clients',
});

export async function fetchClients(service: AxiosInstance = clientApiService) {
  const clients = await service.get<HttpClientResponse[]>('');
  return clients.data;
}

export async function fetchClientData(
  id: string,
  service: AxiosInstance = clientApiService
) {
  const result = await service.get<HttpClientResponse>(id);
  return result.data;
}

export async function createClient(
  formData: any,
  service: AxiosInstance = clientApiService
) {
  const res = await service.post('', formData);
  return res;
}

export async function patchClient(
  id: string,
  data: any,
  service: AxiosInstance = clientApiService
) {
  const res = await service.patch(`${id}`, data);
  return res;
}

export async function deleteClient(
  id: string,
  service: AxiosInstance = clientApiService
) {
  const res = await service.delete(`${id}`);
  return res;
}
