import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import {removeAllCartItem } from "../redux/Slices/cartSlice";
import { useSnackbar } from "notistack";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const  cart  = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);
  const cartData = Object.values(cart.reduce((p, v) => {
    const old = p[v.id];
    if (!old)
      p[v.id] = { ...v, count: 1 };
    else if (old.sort > v.sort)
      p[v.id] = { ...v, count: old.count + 1 };
    else
      p[v.id].count++;
    return p;
  }, {}));

  console.log("cart",cartData)

  function truncate(value)
  {
      if (value < 0) {
          return Math.ceil(value);
      }
  
      return value.toFixed();
  }
  
  const clearCart = () => {
    dispatch(removeAllCartItem());
    enqueueSnackbar(`All Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };


  return (
    <>
      {cartData?.length > 0 ? (
        <>
          <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center items-between p-2">
              {cartData?.map((item) => {
                return <CartItem key={item.id} item={item} />;
              })}
            </div>
            <div>
              <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
                <h1 className="font-semibold text-lg text-purple-800">
                  YOUR CART SUMMARY
                </h1>
                {/* <p>
                  <span className="text-gray-700 font-semibold">
                    Total Items
                  </span>{" "}
                  : {cart.length}
                </p> */}
                <p>
                  {" "}
                  <span className="text-gray-700 font-semibold">
                    Total Amount
                  </span>{" "}
                  : ${truncate(totalAmount)}
                </p>
                <p className="bottom-button">
                <button className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3 mr-5">
                  Checkout Now
                </button>
                <button onClick={clearCart} className="bg-red-700 hover:bg-red-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
                  Clear cart
                </button>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-semibold text-xl mb-2">
              Your cart is empty!
            </h1>
            <Link to={"/"}>
              <button  onClick={clearCart} className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
                SHOP NOW
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
