import axios from "axios";

const API_URL = "http://localhost:5000/api/menus";

export const getMenus = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMenu = async (menu: {
  name: string;
  description: string;
  price: number;
  image: string;
}) => {
  const response = await axios.post(API_URL, menu);
  return response.data;
};

export const updateMenu = async (id: number, menu: {
  name: string;
  description: string;
  price: number;
  image: string;
}) => {
  const response = await axios.put(`${API_URL}/${id}`, menu);
  return response.data;
};

export const deleteMenu = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
