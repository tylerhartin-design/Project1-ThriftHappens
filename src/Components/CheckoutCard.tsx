import type { CheckoutItem } from "./ThriftHapppensApp";

export interface CheckoutCardProps {
  item: CheckoutItem;
  onRemove: () => void;
}

export default function CheckoutCard({ item, onRemove }: CheckoutCardProps) {
  const total = item.price * item.checkoutQuantity;

  return (
    <div>
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Price: ${item.price.toFixed(2)} CAD</p>
      <p>Quantity: {item.checkoutQuantity}</p>
      <p>Size: {item.size}</p>
      <p>Total: ${total.toFixed(2)} CAD</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}
