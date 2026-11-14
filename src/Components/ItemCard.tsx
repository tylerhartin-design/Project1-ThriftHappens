import type { ClothingProduct } from "../Data/data";

export interface ItemCardProps {
  product: ClothingProduct;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  onAddtoCart: () => void;
}

export default function ItemCard({
  product,
  increaseQuantity,
  decreaseQuantity,
  onAddtoCart,
}: ItemCardProps) {
  const isOutOfStock = product.quantity === 0;

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Fit: {product.fit}</p>
      <p>Category: {product.category}</p>
      <p>Size: {product.size}</p>
      <p>Color: {product.color}</p>
      <p>Price: ${product.price.toFixed(2)} CAD</p>
      <p>Remaining Stock: {isOutOfStock ? "Out of stock" : product.quantity}</p>

      {!isOutOfStock && (
        <div>
          <button type="button" onClick={decreaseQuantity}>
            -
          </button>
          <button type="button" onClick={increaseQuantity}>
            +
          </button>
          <button type="button" onClick={onAddtoCart}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}
