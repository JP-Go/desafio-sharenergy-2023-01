import axios, { AxiosInstance } from 'axios';

interface RandomDogApiResponse {
  fileSizeBytes: number;
  url: string;
}

const randomDogService = axios.create({
  baseURL: 'https://random.dog/woof.json',
});

export async function fetchDog(service: AxiosInstance = randomDogService) {
  const response = await service.get<RandomDogApiResponse>('');
  return response.data.url;
}
