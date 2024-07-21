const Contact = ()=>{

    return (
        <div>
            <h1 className="p-2 m-5 text-3xl font-bold">Contact Us page</h1>
            <form>
                <input className="border p-3 border-black rounded-lg mx-5" placeholder="name"/>
                <input className="border p-3 border-black rounded-lg" placeholder="message"/>
                <button className="mx-5 bg-green-400 border p-3 border-green-300 rounded-lg">Submit</button>
            </form>
        </div>
    )
}
export default Contact;