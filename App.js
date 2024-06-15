/*  
React JS 
    It is a Javascript Library for web and native user interfaces.
    Library
        collection of pre-written code that can be used to perform specific tasks
        it only focuses on specific functionality
        you are in charge of the flow of the application. You are choosing when and where to call the library
        we can use react inside small portion of page i.e. inside root node
        we can add it to existing page
        it doesn't change anything outside of root node 
    Framework 
        set of pre-written code that provides a structure for developing software applications
        it inlcudes almost everything u needed to develop the app
        framework is in charge of the flow. It provides some places for you to plug in your code, 
        but it calls the code you plugged in as needed.
    web 
        react and react-dom let you build apps in react for web browsers 
    native
        React Native and Expo let you build apps in React for Android, iOS, and more. 
        They look and feel native because their UIs are truly native.
        It’s not a web view, your React components render real Android and iOS views provided by the platform.
    
    Adding React to the project
        through CDN 
            add React and ReactDOM cdn links at end of body tag
            react.js file contains core of react
            react-dom.js file is needed to modify the DOM
React.createElement
    creating elements is core thing in react, as this is used in native or others also
    parameters: tag name, attributes and children
    returns object that includes props etc.
    it does not return HTML
    children parameter
        can pass content/tag directly
        pass as array if we want to pass multiple children i.e. siblings
        must have key prop for each child in the array
*/

const heading = React.createElement("h1", {}, "Hello world from React");
console.log(heading);
/* 
ouput:
object
*/


/*  
root node 
    it is used to display React components inside a browser DOM node
    react renders everything inside root
    we create root in DOM, so we use ReactDOM
*/
const root = ReactDOM.createRoot(document.getElementById("root"));

/*  
render 
    renders the react element in root node using render function 
    takes react element (Object) and converts it into HTML and adds to DOM
    it replaces content in root node with content we pass 
*/
root.render(heading);


/*
<div id="parent">
    <h2 id="child1"></h2>
    <h2 id="child2"></h2>
</div>
*/

const siblings = React.createElement("div", { id: "parent" }, [
    React.createElement("h2", { id: "child1" },"child1"),
    React.createElement("h2", { id: "child2" }, "child2"),
  ]);

// root.render(siblings)
/*
ouput:
child1
child2
*/