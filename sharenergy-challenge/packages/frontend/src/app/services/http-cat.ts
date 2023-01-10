import { CatResourceStatus } from '@sharenergy-challenge/shared-types';
import axios, { AxiosInstance } from 'axios';

interface HttpCatApiResponse {
  url: string | null;
  status: CatResourceStatus;
}

const HttpCatApiService = axios.create({
  baseURL: 'http://localhost:3333/api/cats',
});

export async function fetchHttCatLink(
  code: number,
  service: AxiosInstance = HttpCatApiService
) {
  try {
    const response = await service.get<HttpCatApiResponse>(`${code}`);
    const data = response.data;
    return data;
  } catch (err: any) {
    if (err.response.status == 404) {
      return {
        url: '/assets/images/cat-not-found.svg',
        status: 'error',
      };
    }
  }
}
