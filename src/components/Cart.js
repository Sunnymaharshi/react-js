import { useDispatch, useSelector } from "react-redux";
import Itemlist from "./Itemlist";
import { clearCart } from "../utils/cartSlice";


const Cart = () => {
    // subscribing to store using selector hook 
    const cartItems = useSelector((store)=>store.cart.items);
    const dispatch = useDispatch();
    const handleClear = ()=>{
        dispatch(clearCart());
    }
  return (
    <div className='res-category w-6/12 mx-auto my-3'>
        <h1 className='text-center font-bold text-xl my-3'>Cart</h1>
        <div className="flex justify-end mb-3">
            <button className="p-3 bg-green-400 rounded-2xl" onClick={handleClear}>Clear Cart</button>
        </div>
        {cartItems.length>0 ? <div className="bg-gray-50 shadow-lg p-4">
            <Itemlist items={cartItems}/>
        </div> : <h1 className="text-lg text-center">Cart is Empty!!! Please Add Items to Cart</h1>}
    </div>
  )
}

export default Cart