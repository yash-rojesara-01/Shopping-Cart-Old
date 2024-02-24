import React,{ useState } from "react";
import { add, remove } from "../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const Product = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [itemCount, setItemCount] = useState(0);

  const addToCart = () => {
    setItemCount(itemCount+1)
   const itemdata = {...item} 

   itemdata['uid'] = new Date().getTime().toString()
   itemdata['price'] = Number(truncate(itemdata.price))
    dispatch(add(itemdata));
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const removeFromCart = () => {
    if(itemCount !== 0){
      setItemCount(itemCount-1)
    dispatch(remove(item.id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  }
  };

  

  function truncate(value)
  {
      if (value < 0) {
          return Math.ceil(value);
      }
  
      return value.toFixed();
  } 
  
  return (
    <>
      <div className="group hover:scale-110 transition duration-300 ease-in flex flex-col items-center border-2 border-cyan-400 gap-3 p-4 h-[350px] mt-10 ml-5  rounded-xl">
        <div className="h-[180px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="truncate w-40 mt-3 text-gray-700 font-semibold text-lg">
            {item.title}
          </h1>
        </div>
        <div> <p className="description">{item.description}</p></div>
        <div className="price-cont">
        <span className="price">${truncate(item.price)}</span>

          {/* {cart.some((p) => p.id === item.id) ? ( */}
          {/* // group-hover:bg-purple-700 group-hover:text-white transition duration-300 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold p-3 */}
            <button
               className="float-right plus"
               onClick={addToCart}
            >
              +
            </button>
          {/* ) : ( */}
          <label className="float-right">{itemCount}</label>
            <button
            className="float-right minus"
            onClick={removeFromCart}
            >
              -
            </button>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Product;
