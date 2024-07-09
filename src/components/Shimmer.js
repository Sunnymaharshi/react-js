const Shimmer = ()=>{
    return (
        <div className="shimmer-container">
            {Array.apply(null, Array(16)).map(
                (key,index) => <div className="shimmer-card" key={index}></div>) 
            }
        </div>
    )
}

export default Shimmer;