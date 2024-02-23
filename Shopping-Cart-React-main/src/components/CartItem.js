import React, {useState} from "react";
import { Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { add, remove, removeFromCartLastItem } from "../redux/Slices/cartSlice";

const CartItem = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [itemCount, setItemCount] = useState(0);

  const removeItemFromCart = () => {
    dispatch(remove(item.id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  
  const addToCart = () => {
    setItemCount(itemCount+1)
    dispatch(add(item));
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const removeFromCartData = (count,uid) => {
    if(count !== 0){
      setItemCount(count-1)
    dispatch(removeFromCartLastItem(uid));
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
      <div className="flex items-center p-5 justify-between bg-violet-200 mt-2 mb-2 rounded-xl">
        <div className="flex p-3">
          <img src={item.image} className="h-28 rounded-lg" alt="" />
          <div className="ml-10 self-start space-y-5">
            <h1 className="text-xl text-purple-700 font-semibold">
              {item.title} 
            </h1> 
            <span class="price-label">${truncate(item.price)}</span>
            <p>${truncate(item.count * item.price)}</p>
          </div>
          <button
               className="float-right minus"
               onClick={()=>removeFromCartData(item.count,item.uid)}
            >
              -
            </button>
          {/* ) : ( */}
          <button className="bold">{item.count}</button>
          <button
            className="float-right plus"
            onClick={addToCart}
            >
              +
            </button>

        </div>
        <div
          onClick={removeItemFromCart}
          className="bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
        >
          <Delete className="text-gray-800" />
        </div>
      </div>
    </>
  );
};

export default CartItem;
