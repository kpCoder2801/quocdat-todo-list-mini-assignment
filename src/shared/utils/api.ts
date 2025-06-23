import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";

type RequestType = "json" | "urlencoded" | "form-data";

const ContentTypeMap: Record<RequestType, string> = {
  json: "application/json",
  urlencoded: "application/x-www-form-urlencoded",
  "form-data": "multipart/form-data",
};

const axiosBaseInstance = axios.create();

let requestTimeout: number;

const getRequestTimeout = () => {
  if (!requestTimeout) {
    requestTimeout = 5 * 1000; // 5 seconds
  }

  return requestTimeout;
};

const request = async <T = unknown>(params: {
  method: Method;
  url: string;
  data: any;
  instance?: AxiosInstance;
  type?: RequestType;
}): Promise<any | AxiosResponse<any, any> | unknown> => {
  const {
    method,
    url,
    data,
    instance = axiosBaseInstance,
    type = "json",
  } = params;

  const requestConfig: Partial<AxiosRequestConfig> = {
    baseURL: "http://localhost:8080/",
    url,
    method,
    headers: {
      "Content-Type": ContentTypeMap[type],
    },
    timeout: getRequestTimeout(),
  };

  try {
    let response: AxiosResponse<T>;

    if (method === "get") {
      response = await instance.request<T>({ ...requestConfig, params: data });
    } else {
      response = await instance.request<T>({ ...requestConfig, data });
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
        // TODO: Handle unauthorized error
      }

      throw error.response;
    }

    throw error;
  }
};

const get = <T = unknown>(
  endpoint: string,
  data: Record<string, any> = {}
): Promise<T> => request<T>({ method: "get", url: endpoint, data });

const post = <T = unknown>(
  endpoint: string,
  data: Record<string, any> = {}
): Promise<T> => request<T>({ method: "post", url: endpoint, data });

const put = <T = unknown>(
  endpoint: string,
  data: Record<string, any> = {}
): Promise<T> => request<T>({ method: "put", url: endpoint, data });

const patch = <T = unknown>(
  endpoint: string,
  data: Record<string, any> = {}
): Promise<T> => request<T>({ method: "patch", url: endpoint, data });

const del = <T = unknown>(
  endpoint: string,
  data: Record<string, any> = {}
): Promise<T> => request<T>({ method: "delete", url: endpoint, data });

export { get, post, put, patch, del };
