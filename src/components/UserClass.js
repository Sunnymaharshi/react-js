import React from "react"
class UserClass extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userInfo:{
                name:"Dummy",
                login:"Default",
                avatar_url: ""
            }
        }
    }
    async componentDidMount(){
        const user_data = await fetch("https://api.github.com/users/Sunnymaharshi");
        const user_json = await user_data.json()
        console.log(user_json)
        this.setState({
            userInfo:user_json
        })
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    componentWillUnmount(){
        console.log("componentWillUnmount")
    }
    render(){
        const {name,login, avatar_url} = this.state.userInfo;
        return (
            <div className='user-card'>
                
                <h2>Name: {name}</h2>
                <h3>Contact: @{login}</h3>
                <img src={avatar_url} alt="avatar" width={50} height={50}></img>
            </div>
          )
    }

}

export default UserClass;