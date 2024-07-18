import { useDispatch } from "react-redux"
import { CDN_URL } from "../utils/constant"
import { addItem } from "../utils/cartSlice";
const Itemlist = ({items}) => {

    const dispatch = useDispatch();
    const handleAdd = (item)=>{
        // dispatch an action 
        dispatch(addItem(item))

    }
  return (
    <div>
        {items.map(
            (item=> 
                (
                <div key={item.card.info.id} className='px-5 my-5 flex'>
                    <div className="w-10/12 pr-10">
                    <div>
                        <span>{item.card.info.name}</span> 
                        <span> - ₹{item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100}</span> 
                    </div>
                    <p className='text-xs mt-2'>{item.card.info.description}</p>
                    </div>
                    <div className="w-2/12">
                    <button className="absolute bg-black text-white rounded-l p-2" onClick={()=>handleAdd(item)}>Add +</button>
                    <img src={CDN_URL + item.card.info.imageId} width={150} alt="item-image"/>
                    </div>
                </div>
                )
            )
        )}
    </div>
  )
}

export default Itemlist