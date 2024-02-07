import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((cb) => cb),
}));
const axiosInstance = jest.requireActual('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxiosCreate = jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: 'data' })),
    }));
    axiosInstance.create = mockedAxiosCreate;

    await throttledGetDataFromApi('testRelativePath');

    expect(mockedAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxiosGet = jest.fn().mockResolvedValue({ data: 'data' });
    const mockedAxiosCreate = jest.fn(() => ({
      get: mockedAxiosGet,
    }));
    const testUrl = 'testRelativePath';
    axiosInstance.create = mockedAxiosCreate;

    await throttledGetDataFromApi(testUrl);

    expect(mockedAxiosGet).toHaveBeenCalledWith(testUrl);
  });

  test('should return response data', async () => {
    const responseData = 'data';
    const mockedAxiosCreate = jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: responseData })),
    }));
    axiosInstance.create = mockedAxiosCreate;

    expect(await throttledGetDataFromApi('testRelativePath')).toBe(
      responseData,
    );
  });
});
