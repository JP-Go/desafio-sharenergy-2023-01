import axios, { AxiosInstance } from 'axios';

interface HttpCatApiResponse {
  url: string | null;
  status: 'ok' | 'error';
}

const HttpCatApiService = axios.create({
  baseURL: 'http://localhost:3333/api/cats',
});

export async function fetchHttCatLink(
  code: number,
  service: AxiosInstance = HttpCatApiService
) {
  const response = await service.get<HttpCatApiResponse>(`${code}`);
  const data = response.data;
  return data.status === 'ok'
    ? String(data.url)
    : '/assets/images/cat-not-found.svg';
}
