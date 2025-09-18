export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuFormData {
  name: string;
  description: string;
  price: number;
  image: string;
}
export interface MenuFormDataErrors {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
}