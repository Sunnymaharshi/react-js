import { useParams } from "react-router-dom";
import { useState } from "react";
import Shimmer from "./Shimmer";
import useResMenu from "../utils/useResMenu";
import ResCategory from "./ResCategory";

const ResMenu = () => {
    const [showIndex,setShowIndex] = useState(-1);
    const handleExpand = (index)=>{
        setShowIndex(index);
    }
    const {resId} = useParams();    
    const resInfo =  useResMenu(resId);
    if(resInfo===null) return <Shimmer/>

    // destructuring only if resInfo is not null, as above block will return loading tag
    const {name} = resInfo?.cards[2]?.card?.card?.info;
    const {cuisines} = resInfo?.cards[2]?.card?.card?.info;
    const {costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
    const categories  = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>{
        return c?.card?.["card"]?.["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    })

    return (
    <div className="res-menu">
        <h1 className="font-bold text-2xl my-3 text-center">{name}</h1>
        <h3 className="text-lg font-bold text-center">{cuisines.join(", ")} - {costForTwoMessage}</h3>
        {categories.map((cat,index)=><ResCategory key={cat.card.card.title}
         data={cat.card.card} 
         expand={index===showIndex}
         handleClick={()=>{
            if(showIndex===index)
                setShowIndex(-1)
            else
            setShowIndex(index)}}/>)}
    </div>
  )
}

export default ResMenu;