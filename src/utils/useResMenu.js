import { useState,useEffect } from "react";
import { MENU_API } from "./constant";

const useResMenu = (resId)=> {
    const [resInfo, setResInfo] = useState(null);
    useEffect(()=>{
        fetchMenu()
    },[])
    const fetchMenu = async ()=>{
        const data = await fetch(MENU_API + resId);
        // const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=201224&catalog_qa=undefined&submitAction=ENTER");
        const menu = await data.json()
        setResInfo(menu.data)
    }

    return resInfo;
}
export default useResMenu;