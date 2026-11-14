import { useState } from "react";
import {
  products as initialProducts,
  type ClothingProduct,
} from "../Data/data";
import ItemContainer from "./ItemContainer";
import CheckoutContainer from "./CheckoutContainer";
import NavBar from "./NavBar";

//Extends clothingProduct to include the quantity being purchased
export interface CheckoutItem extends ClothingProduct {
  checkoutQuantity: number;
}

export default function ThriftHapppensApp() {
  //Stores products
  const [products, setProducts] = useState<ClothingProduct[]>(initialProducts);
  //Checkout items
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  //Which Screen is displayed
  const [showCheckout, setShowCheckout] = useState(false);

  //Handles upadating the quantity of products
  const handleQuantityChange = (id: number, quantityChange: number) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id &&
        product.itemQuantity + quantityChange >= 0 &&
        product.itemQuantity + quantityChange <= product.quantity
          ? { ...product, itemQuantity: product.itemQuantity + quantityChange }
          : product,
      ),
    );
  };

  //Handles adding items to the cart
  const handleOnAddToCart = (product: ClothingProduct) => {
    if (product.itemQuantity <= 0) {
      return;
    }

    //Checks if the Products already exists in the cart
    setCheckoutItems((currentCheckout) => {
      const existingItem = currentCheckout.find(
        (checkoutItem) => checkoutItem.id === product.id,
      );
      //if it exists add the current cart quantity
      if (existingItem) {
        return currentCheckout.map((checkoutItem) =>
          checkoutItem.id === product.id
            ? {
                ...checkoutItem,
                checkoutQuantity:
                  checkoutItem.checkoutQuantity + product.itemQuantity,
              }
            : checkoutItem,
        );
      }

      //if no product adds to cart
      return [
        ...currentCheckout,
        { ...product, checkoutQuantity: product.itemQuantity },
      ];
    });

    //reduces stock and resets the selected quantity to 0
    setProducts((currentProducts) =>
      currentProducts.map((currentProduct) =>
        currentProduct.id === product.id
          ? {
              ...currentProduct,
              quantity: currentProduct.quantity - product.itemQuantity,
              itemQuantity: 0,
            }
          : currentProduct,
      ),
    );
  };

  //handles when you remove item from cart
  const handleOnRemove = (id: number) => {
    const itemToRemove = checkoutItems.find((item) => item.id === id);

    if (!itemToRemove) {
      return;
    }

    //Removes the selected item from the cart
    setCheckoutItems((currentCheckout) =>
      currentCheckout.filter((checkoutItem) => checkoutItem.id !== id),
    );

    //Resets the product stock so it shows in the catalogue
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + itemToRemove.checkoutQuantity,
              itemQuantity: 0,
            }
          : product,
      ),
    );
  };

  //Handles emptying the Checkout
  const handleEmptyCheckout = () => {
    //Resets the product stock so it shows in the catalogue
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const cartItem = checkoutItems.find((item) => item.id === product.id);

        if (!cartItem) {
          return product;
        }

        return {
          ...product,
          quantity: product.quantity + cartItem.checkoutQuantity,
          itemQuantity: 0,
        };
      }),
    );
    //Clears all items from the checkout
    setCheckoutItems([]);
  };

  return (
    <div>
      <NavBar />
      <button onClick={() => setShowCheckout(!showCheckout)}>
        {showCheckout ? "Back to Catalogue" : "Checkout"}
      </button>
      {showCheckout ? (
        <CheckoutContainer
          checkoutItems={checkoutItems}
          onRemove={handleOnRemove}
          onEmptyCheckout={handleEmptyCheckout}
        />
      ) : (
        <ItemContainer
          products={products}
          increaseQuantity={(id) => handleQuantityChange(id, 1)}
          decreaseQuantity={(id) => handleQuantityChange(id, -1)}
          onAddToCart={handleOnAddToCart}
        />
      )}
      <button type="button" onClick={handleEmptyCheckout}>
        Clear Cart
      </button>
    </div>
  );
}
