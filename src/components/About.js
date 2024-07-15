import User from './User';
import UserClass from './UserClass';
const About = ()=>{

    return (
        <div>
            <h1>About Us page</h1>
            {/* <User name="Sunny" location="Andhra" /> */}
            <UserClass name="Sunny (class)" location="Andhra (class)" />
        </div>
    )
}
export default About;