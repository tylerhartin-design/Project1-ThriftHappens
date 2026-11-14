import type { ClothingProduct } from "../Data/data";
import ItemCard from "./ItemCard";

export interface ItemContainerProps {
  products: ClothingProduct[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  onAddToCart: (product: ClothingProduct) => void;
}

export default function ItemContainer({
  products,
  increaseQuantity,
  decreaseQuantity,
  onAddToCart,
}: ItemContainerProps) {
  return (
    <div>
      <h2>Product Catalogue ({products.length} items)</h2>
      {products.map((products) => (
        <ItemCard
          key={products.id}
          product={products}
          increaseQuantity={() => increaseQuantity(products.id)}
          decreaseQuantity={() => decreaseQuantity(products.id)}
          onAddtoCart={() => onAddToCart(products)}
        />
      ))}
    </div>
  );
}
