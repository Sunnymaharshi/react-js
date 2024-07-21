import ResCard, {withPromotedLabel} from "./ResCard";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import useOnlineStatus from "../utils/useOnlineStatus"
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // returns a component
  const ResCardPromoted = withPromotedLabel(ResCard);
  const handleFilter = ()=>{
      const filtered  = listOfRestaurants.filter((res)=> res.info.avgRating>4.5);
      setFilteredRestaurants(filtered);
    }
    const {loggedInUser,setUserName} = useContext(UserContext);
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async ()=>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    const json = await data.json()
    setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  }

  const handleSearch = ()=>{
    const filtered = listOfRestaurants.filter((res)=>
        res.info.name.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredRestaurants(filtered);
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
            <input type="text" data-testid="searchInput" className="search-input border border-solid border-black p-2" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value)
            }}/>
            <button onClick={handleSearch} className="p-2 mx-2 bg-green-400 rounded-lg">Search</button>
        </div>
        <button className="filter-btn h-max p-2 mx-2 bg-green-400 rounded-lg" onClick={handleFilter}>Top Rated Restaurants</button>
        <div className="m-4 p-4">
            <label className="p-2 font-bold">Username:</label>
            <input type="text" className="border border-solid border-black p-2" value={loggedInUser} 
            onChange={(e)=>{
                setUserName(e.target.value)
            }}/>
            
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurants.map((res) => (
          <Link to={"/restaurant/"+res.info.id} key={res.info.id}>
            {res.info.avgRatingString>=4.6 ?
                <ResCardPromoted resData={res}/>
                : <ResCard resData={res}  />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;