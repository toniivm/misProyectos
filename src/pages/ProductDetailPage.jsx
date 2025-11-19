import React from "react";
import { useParams } from 'react-router-dom';
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import PRODUCTS from "../data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-12 text-center text-xl font-semibold">
        Error 404: Producto no encontrado.
      </div>
    );
  }

  const { images = [], sizes = ["42", "43"] } = product; 

  return (
    // Estructura de dos columnas, similar al ejemplo (Galería 60% / Info 40%)
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto my-16 p-8">
      <div className="lg:w-3/5 lg:pr-16 mb-10 lg:mb-0">
        <ProductGallery images={images} />
      </div>
      <div className="lg:w-2/5 lg:sticky lg:top-16">
        <ProductInfo product={{...product, sizes}} />
      </div>
    </div>
  );
}