import axios from "axios";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL ?? "http://localhost:1337",
});

clientAxios.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_READONLY_API_KEY;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientAxios;

const getClientMediaUrl = (url: string) => {
  return process.env.NEXT_PUBLIC_STRAPI_BASE_URL + url;
};
// define document file URL 
const getOpenDataUrl = (url: string) => {
  const base = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";
  if (!url) return "";
  return url.startsWith("http") ? url : `${base}${url}`;
};


export { clientAxios, getClientMediaUrl, getOpenDataUrl };
