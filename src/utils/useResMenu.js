import { useState,useEffect } from "react";
import { MENU_API } from "./constant";

const useResMenu = (resId)=> {
    const [resInfo, setResInfo] = useState(null);
    useEffect(()=>{
        fetchMenu()
    },[])
    const fetchMenu = async ()=>{
        const data = await fetch(MENU_API + resId);
        const menu = await data.json()
        console.log(menu)
        setResInfo(menu.data)
    }

    return resInfo;
}
export default useResMenu;