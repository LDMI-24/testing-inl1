import { createContext } from "react";
import type { Product } from "../models/Product";

export interface IProductContext {
  products: Product[];
  addToCart: (title: string, id: number) => void;
  removeFromCart: (title: string, id: number) => void;
  clearCart: (id: number) => void;
}

export const CartContext = createContext<IProductContext>({
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});