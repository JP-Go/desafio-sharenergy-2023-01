import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

export class InMemoryHttpCatsHtttpService extends HttpService {
  private catsMockData = [
    {
      data: '200' as any,
      statusText: 'OK',
      status: 200,
      headers: {},
      config: {},
    },
    {
      data: '500' as any,
      statusText: 'Not Found',
      status: 200,
      headers: {},
      config: {},
    },
  ];

  get<T = any>(url: string, config?: AxiosRequestConfig<T>) {
    const code = url.split('/').at(-1)?.replace('/', '');
    const result = this.catsMockData.find((item) => item.data === `${code}`);
    return of(
      result ?? {
        data: code as any,
        statusText: 'Not Found',
        status: 404,
        headers: {},
        config: {},
      }
    );
  }
}
