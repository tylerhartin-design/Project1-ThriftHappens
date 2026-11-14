import type { CheckoutItem } from "./ThriftHapppensApp";

export interface CheckoutCardProps {
  checkoutItems: CheckoutItem[];
  onRemove: (id: number) => void;
  onEmptyCheckout: () => void;
}

export default function CheckoutCard({
  checkoutItems,
  onRemove,
  onEmptyCheckout,
}: CheckoutCardProps) {
  //Checks to see if the cart is empty
  if (checkoutItems.length === 0) {
    return (
      <div>
        <h2>Your cart is empty.</h2>
        <button onClick={onEmptyCheckout}>Empty Checkout</button>
      </div>
    );
    //if its not empty calculate the Grand total
  } else {
    const grandTotal = checkoutItems.reduce(
      (sum, item) => sum + item.price * item.checkoutQuantity,
      0,
    );
    return (
      <div>
        <h2>Checkout</h2>
        {checkoutItems.map((item) => {
          const subtotal = item.price * item.checkoutQuantity;

          return (
            <div key={item.id}>
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p> Quantity: {item.checkoutQuantity} </p>
              <p> Size: {item.size}</p>
              <p>Total: ${subtotal.toFixed(2)} CAD</p>

              <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          );
        })}
        <h2>Grand Total: ${grandTotal.toFixed(2)} CAD</h2>
      </div>
    );
  }
}
