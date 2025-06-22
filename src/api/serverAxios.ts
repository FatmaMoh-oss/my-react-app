import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.STRAPI_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_READONLY_API_KEY;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const serverAxios = (url: string) =>
  apiClient.get(url).then((res) => res.data.data);

const getServerMediaUrl = (url: string) => {
  return process.env.STRAPI_BASE_URL + url;
};

export { serverAxios, getServerMediaUrl };
