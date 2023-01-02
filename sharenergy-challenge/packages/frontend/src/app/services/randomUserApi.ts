import axios, { AxiosInstance } from 'axios';

interface RandomUserApiResponse {
  results: [
    {
      name: { first: string; last: string };
      email: string;
      login: {
        username: string;
      };
      dob: { age: number };
      picture: {
        large: string;
      };
    }
  ];
  info: { seed: string; results: number; page: number; version: string };
}

const RandomUserApiService = axios.create({
  baseURL: 'https://randomuser.me/api/',
  params: {
    seed: 'random_seed',
  },
});

export async function fetchUsers(
  page: number = 1,
  resultsPerPage: number = 10,
  service: AxiosInstance = RandomUserApiService
) {
  const response = await service.get<RandomUserApiResponse>('', {
    params: {
      page,
      results: resultsPerPage,
    },
  });
  const data = response.data;
  return data.results.map(({ name, email, login, dob, picture }) => {
    return {
      fullName: `${name.first} ${name.last}`,
      email,
      username: login.username,
      age: dob.age,
      pictureUrl: picture.large,
    };
  });
}
