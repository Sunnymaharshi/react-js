import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constant";

const ResMenu = () => {

    const [resInfo, setResInfo] = useState(null);
    const {resId} = useParams();

    useEffect(()=>{
        fetchMenu()
    },[])
    const fetchMenu = async ()=>{
        const data = await fetch(MENU_API + resId);
        const menu = await data.json()
        console.log(menu)
        setResInfo(menu.data)
    }

    if(resInfo===null) return <Shimmer/>

    // destructuring only if resInfo is not null, as above block will return loading tag
    const {name} = resInfo?.cards[2]?.card?.card?.info;
    const {cuisines} = resInfo?.cards[2]?.card?.card?.info;
    const {costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card
    
    return (
    <div className="res-menu">
        <h1>{name}</h1>
        <h3>{cuisines.join(", ")} - {costForTwoMessage}</h3>
        <ul>
            {itemCards.map((item)=> <li key={item.card.info.id}>{item.card.info.name} - &#8377;{item.card.info.price/100}</li>)}
        </ul>
    </div>
  )
}

export default ResMenu;