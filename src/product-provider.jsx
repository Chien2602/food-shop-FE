"use client";

import { createContext, useContext, useState } from "react";

export const ProductContext = createContext({
  currentProduct: null,
  setCurrentProduct: () => {},

  selectProduct: null,
  setSelectProduct: () => {},

  category: null,
  setCategory: () => {},
});

export const usePlayer = () => useContext(ProductContext);

export function ProductProvider({ children }) {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [category, setCategory] = useState(null);

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        setCurrentProduct,

        selectProduct,
        setSelectProduct,

        category,
        setCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
