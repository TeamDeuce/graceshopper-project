import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCartAsync,
  removeFromCartAsync,
  editQuantityAsync,
} from "./checkoutslice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartitems);
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync({ userId: user.id }));
    }
  }, [dispatch, user]);

  const removeFromCart = (productId) => {
    const cartId = cart.id;
    if (user) {
      dispatch(removeFromCartAsync({ cartId, productId, userId }));
    }
  };

  const editQuantity = (productId, plusOrMinus) => {
    const userId = cart.userId;
    dispatch(editQuantityAsync({ userId, productId, plusOrMinus }));
  };

  const fetchCartTotal = (cart) => {
    let total = 0;
    if (cart && cart.cartitems) {
      cart.cartitems.forEach((cartItem) => {
        total += cartItem.product.price * cartItem.quantity;
      });
    }
    return total;
  };

  return (
    <>
      <div>
        <h2>Checkout</h2>
        <form onSubmit={() => {}}>
          <h3>Order Summary</h3>
          <div className="all-products">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartitem) => (
                <div className="individual-product" key={cartitem.productId}>
                  <span>{cartitem.product.name}</span>
                  <img
                    src={cartitem.product.image}
                    alt={cartitem.product.name}
                  />
                  <span>
                    {cartitem.quantity} x $
                    {Number(cartitem.product.price).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    id="remove-from-cart"
                    onClick={() => removeFromCart(cartitem.productId)}
                  >
                    Remove item from cart
                  </button>
                  <div className="edit-quantity">
                    <button
                      type="button"
                      id="reduce-quantity"
                      onClick={() => editQuantity(cartitem.productId, -1)}
                    >
                      -
                    </button>
                    <h3>Quantity: {cartitem.quantity}</h3>
                    <button
                      type="button"
                      id="increase-quantity"
                      onClick={() => editQuantity(cartitem.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <br />
          <h4>Total: ${fetchCartTotal(cart).toFixed(2)}</h4>
          <Link to="/confirmation">
            <button 
                type="button"
                id="complete-checkout" >Complete Checkout
             </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Checkout;
