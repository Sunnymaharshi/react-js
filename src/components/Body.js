import ResCard from "./ResCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus"
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleFilter = ()=>{
    const filtered  = listOfRestaurants.filter((res)=> res.info.avgRatingString>4.5);
    setListOfRestaurants(filtered);
  }
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async ()=>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    const json = await data.json()
    console.log(json);
    setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  }

  const handleSearch = ()=>{
    const filteredRestaurants = listOfRestaurants.filter((res)=>
        res.info.name.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredRestaurants(filteredRestaurants);
  }

  const online = useOnlineStatus();
  if(!online){
    return <h1>You are offline</h1>
  }
  // Conditional Rendering  
  return listOfRestaurants.length === 0 ? <Shimmer/> : (
    <div className="body">
      <div className="filter flex items-center">
        <div className="search m-4 p-4">
            <input type="text" className="search-input border border-solid border-black p-2" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value)
            }}/>
            <button onClick={handleSearch} className="p-2 mx-2 bg-green-400 rounded-lg">Search</button>
        </div>
        <button className="filter-btn h-max p-2 mx-2 bg-green-400 rounded-lg" onClick={handleFilter}>Top Rated Restaurants</button>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurants.map((res) => (
          <Link to={"/restaurant/"+res.info.id} key={res.info.id}><ResCard resData={res}  /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;