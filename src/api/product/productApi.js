import axiosClient from "./axiosClient";

export const productApi = {

  getProducts: (limit, skip) =>
    axiosClient.get(`/products?limit=${limit}&skip=${skip}`),

  getProductById: (id) =>
    axiosClient.get(`/products/${id}`),

  getCategories: () =>
    axiosClient.get("/products/categories"),

  getProductsByCategory: (category) =>
    axiosClient.get(`/products/category/${category}`),

  getDataFromApi: (url) => 
    axiosClient.get(url)
};