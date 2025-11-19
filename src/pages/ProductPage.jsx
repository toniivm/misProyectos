import React from "react";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";

export default function ProductPage() {
  const product = {
    id: 1,
    title: "Nike Air Max Plus Azul",
    description:
      "Zapatillas Nike Air Max Plus con amortiguación Tuned Air y diseño azul marino.",
    price: 179.99,
    images: [
      "/img/tnazul.jpg",],
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-8 max-w-7xl mx-auto">
      <ProductGallery images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
}
