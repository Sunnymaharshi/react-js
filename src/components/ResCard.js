import { CDN_URL } from "../utils/constant";

const ResCard = (props) => {
    // we can destructure props object in above line itself
    const { resData } = props;
    
    const {cloudinaryImageId,name,cuisines,avgRating,sla} = resData?.info
  
    return (
      // wrapped object inside {}, since JSX runs Javascript only inside {}
      <div className="res-card m-2 p-1 w-[250px]" style={{ backgroundColor: "#f0f0f0" }}>
        <img
          className="res-logo"
          src={CDN_URL
             +
            cloudinaryImageId
          }
          alt="food"
        />
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{sla.deliveryTime} min</h4>
      </div>
    );
};

export default ResCard;