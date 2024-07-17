import Itemlist from "./Itemlist";

const ResCategory = ({data, expand, handleClick}) => {
    
  return (
    <div className='res-category w-6/12 mx-auto my-3 bg-gray-50 shadow-lg p-4'>
        <div className="flex justify-between p-1 hover:cursor-pointer select-none" onClick={handleClick}>
            <span className="font-bold">{data.title} ({data.itemCards.length})</span>
            <span>{expand?"⬆️":"⬇️"}</span>
        </div>
        {expand && <Itemlist items={data.itemCards}/>}
    </div>
  )
}

export default ResCategory;