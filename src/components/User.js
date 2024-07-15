import {useState} from 'react'

const User = ({name,location}) => {
    const [count,setCount] = useState(0);
    const [count2,setCount2] = useState(1);

    return (
        <div className='user-card'>
            <h2>Count: {count}</h2>
            <h2>Count2: {count2}</h2>
            <h2>Name: {name}</h2>
            <h2>Location: {location}</h2>
            <h3>Contact: @Sunnymaharshi</h3>
        </div>
    )
}

export default User