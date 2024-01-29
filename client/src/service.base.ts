import axiosRetry from 'axios-retry';
import Axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export const getHttpClient = (): AxiosInstance => {
    const axiosInstance = Axios.create();

    axiosRetry(axiosInstance, {
        retryDelay: (axiosRetry as any).exponentialDelay,
        retries: 3,
    });

    axiosInstance.defaults.baseURL = 'http://localhost:5000/';

    axiosInstance.interceptors.request.use((config: any) => {
        if (config.data == null && config.method?.toUpperCase() === 'POST') {
            return { ...config, data: {} };
        }

        return config;
    });

    return axiosInstance;
};

export const httpDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    await getHttpClient().delete<T>(url, config).then((response: any) => response.data);

export const httpGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    await getHttpClient().get<T>(url, config).then((response: any) => response.data);

export const httpGetMappedArrayOf = async <T>(url: string, map: (v: any) => T): Promise<T[]> =>
    await getHttpClient().get<any[]>(url).then((response: any) => response.data.map(map));

export const httpGetMappedObject = async <T>(url: string, map: (v: any) => T): Promise<T> =>
    await getHttpClient().get<any>(url).then((response: any) => map(response.data));

export const httpPost = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<T> => await getHttpClient().post<T>(url, data, config).then((response: any) => response.data);

export const httpPut = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<T> => await getHttpClient().put<T>(url, data, config).then((response: any) => response.data);
