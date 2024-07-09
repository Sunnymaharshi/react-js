import ResCard from "./ResCard";
import { useState, useEffect } from "react";
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
  // Conditional Rendering  
  return listOfRestaurants.length === 0 ? <Shimmer/> : (
    <div className="body">
      <div className="filter">
        <div className="search">
            <input type="text" className="search-input" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value)
            }}/>
            <button onClick={handleSearch}>Search</button>
        </div>
        <button className="filter-btn" onClick={handleFilter}>Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((res) => (
          <ResCard resData={res} key={res.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;