import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import ResMenu from "./components/ResMenu";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
const Grocery = lazy(()=> import('./components/Grocery'))
/*  
React JS 
    It is a Javascript Library for web and native user interfaces.
    React is fast because it does efficient DOM manipulation 
    It uses Reconciliation Algorithm (React Fiber) to check diff of old and new virtual DOMs
    and then it updates actual DOM
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
        using CDN 
            add React and ReactDOM cdn links at end of body tag
            react.js file contains core of react
            react-dom.js file is needed to modify the DOM
        using npm
            npm i react 
            npm i react-dom
            add import statement like: import React from "react"
            script tags in html are browser scripts
            browser scripts can't have imports or exports
            so we give type="module" for script tags where have import/export statements
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

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello world from React Element"
);
// console.log(heading);
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
  React.createElement("h2", { id: "child1",key:1 }, "child1"),
  React.createElement("h2", { id: "child2",key:2 }, "child2"),
]);

// root.render(siblings)
/*
ouput:
child1
child2
*/

/*
    npm 
        manages packages
        not node package manager, it doesn't have a full form
    package.json 
        it is configuration for npm
    App dependencies
        normal dependencies
            required in development and production also
        dev dependencies
            required only in development phase
    caret(^) before version
        ^version “Compatible with version”
        will automatically update you to all future minor/patch versions that are backwards-compatible
        without incrementing the major version. ^1.2.3 will use releases from 1.2.3 to < 2.0.0
    tilde(~) before version
        ~version “Approximately equivalent to version”
        will automatically update you to all future patch versions that are backwards-compatible
        without incrementing the minor version. ~1.2.3 will use releases from 1.2.3 to < 1.3.0.
    node modules 
        contains app dependency packages
        and also dependencies of each packages so on
    package-lock.json
        it keeps record of exact version and other info of all the packages in node modules
    npm install 
        it will install every package inside package.json with exact version in package-lock.json
        so we can ignore the node modules folder while pushing code to github
    npx 
        we use npm to install the package
        npx is to execute or run the package
        ex: npx parcel index.html
    scripts in package.json
        create custom commands
        instead of using npx and command, npm run script_name
    browserslist package
        to suport older browsers
        added browserslist in package.json
    parcel
        it is a bundler like webpack
        it does
            dev build 
            local server
            HMR - Hot Module Replacement
                auto refresh page after saving file
            uses cache for faster builds 
            Image Optimization 
            Minification
            Compress files 
            Consistent hashing 
            Code splitting 
            Differential Bundling
                to support older browsers
            HTTPS
                can open the app in HTTPS instead of HTTP
            Tree shaking
                remove unused code 
            Different dev and prod bundles 
*/

/*  JSX
        HTML like syntax, it makes writing react code easy
        not part of React
        it is not valid Javascript
        it is transpiled by babel before it reaches JS Engine
        babel 
            converts JSX to React.createElement
            convert ES6+ Javascript to older browser understandable Javascript
        final output is an object, since React.createElement returns JS object
        html attributes are written in camelCase
        all tags in JSX are self closing tags
        inline css styles are provided as JS object in JSX
        multi line JSX must be wrapped with paranthesis ()
        can run Javascript expressions inside curly bracket {}
        React Element (js object) can be rendered by putting inside {}
        HTML => JSX
        class   className
        for     HTMLFor     
        if we added some malicious html/js, JSX won't run it
        React helps prevent injection attacks by automatically escaping any values embedded within JSX elements
        React converts all embedded values to strings before rendering them, effectively neutralizing potentially malicious code.
*/
// React element using JSX
const jsx_heading = <h1 id="heading-jsx">Hello world from React JSX</h1>;
// console.log(jsx_heading);
/* 
ouput:
object
*/
root.render(jsx_heading);

/*
React Components 
    everything in react is a component
    Class based Components - old way
    Function based Components -  new way 
        it is just a Javascript function which returns react element
        name must start with Capital letter
        rendering it
            <Heading />
            <Heading></Heading>
            {Heading()}  (don't use this method)  
                this is not a component
                react doesn't see this as a component instance    
        Component composition
            combining small components to create a big component
            components inside component

    Component
        description of piece of UI 
        Template 
    Component Instance
        when we use a component, react creates an instance of the component from it's template 
    React Elements 
        JSX is converted to React.createElement() function calls 
        It is result of these functions 
        Information necessary to create DOM elements
*/
const Title = () => {
  return <h1>Namaste React</h1>;
};
const data = "js data";
const Heading = () => {
  return (
    <div>
      <Title />
      {jsx_heading}
      {data}
      <h1 id="heading-func-component">
        Hello world from React Functional Component
      </h1>
    </div>
  );
};

root.render(<Heading />);

/************************************** Food Ordering App **********************************/
/*
    Config-Driven UI    
        Config-driven UI is a design pattern where the structure and behaviour of the 
        user interface are defined using configuration files rather than hard-coded in the application. 
        passing the data according to config
        ex:passing food offers based on user location(city)
        
    props 
        aka properties
        props are read only.
        passing prop to Functional Component is same as passing argument to a function.
        'children' prop 
            it is passed for all components
            used for more re-usability
            whatever we pass inside the component tag, we get as a children prop 
            ex: <Button><p>Submit</p></Button>
            here, <p>Submit</p> is passed as children prop in Button component
    propTypes 
        used to specific type of props inside the component
        to validate props passed to the component
        ex: Button.propTypes = {
            text: PropTypes.string.isRequired
        }
    Component composition 
        combining different components using children prop (or explicitly defined props)
        to create highly re-usable and flexible components,
        this can fix prop drilling issue to an extent, 
        move all components to top level by using children prop inside parent components 
        then pass the state to components which need it
        ex: in App component
            <>
                <Nav>
                    <Profile user={user} />
                </Nav>
                <Main>
                    <List>
                        <MovieList movies={movies} />
                    </List>
                </Main>
            </>

    Optional chaining (?.)
        (?.) operator accesses an object's property or calls a function. 
        If the object accessed or function called using this operator is undefined or null, 
        the expression short circuits and evaluates to undefined instead of throwing an error.

    key for children inside map 
        if a new child is added/removed in list, react doesn't know which one it is
        so react will re-render all list items
        if each child has an unique id, react will render just added child 
        Don't use index as key
            Suppose the parent component gets an array of 10 items and renders 10 components based on the array. 
            Suppose the 5th item is then removed from the array. On the next render the parent will receive 
            an array of 9 items and so React will render 9 components. 
            This will show up as the 10th component getting removed, instead of the 5th, 
            because React has no way of differentiating between the items based on index.
    
    exporting data 
        default export
            can only have 1 default export in a file
            can import it with any name, without {} 
        named export
            used to export multiple things in a file
            must use same name inside {}
        A module can contain both named exports and a default export, and they can be imported 
        together using import defaultExport, { namedExport1, namedExport3, etc... } from 'module';

    Conditional Rendering
        rendering based on conditions

    Standards
        don't keep hardcoded values inside Components
        keep them inside a config file ex:utils/constants.js
    How React works
        Render Phase 
            Virtual DOM 
                Tree of all react elements created from all instances in component tree
            re-rendering a component will cause all of it's child components to be re-rendered as well 
            no mater if props changed or not

            Reconciliation (current reconciler in React is Fiber)
                Deciding which DOM elements actually need to be inserted, deleted or updated to reflect latest state changes.
                Fiber                 
                    takes Element Tree (virtual DOM) and builds fiber tree
                    fiber tree is a internal tree that has a 'fiber' for each component instance and DOM element
                    Fibers are not created in every render, they just updated on every re-renders 
                    it is unit of work
                    work can be done asyncronously 
                        work can be split, prioritize, paused and resumed
                Diffing 
                    comparing elements one by one based on their position in element tree (virtual DOM)
                    same position different elements 
                        different DOM element is created
                        old components are removed from DOM including state
                    same position same elements
                        element will be kept (as well as child elements), including state
                        we can use key prop to reset the state in this situation
                        new props/attributes are passed if they changed between renders
                after Reconciliation and Diffing, fiber tree is updated 
                list of DOM updates need to be done are generated
        Commit Phase 
            ReactDOM library writes to DOM 
            Renderer
                it commits the result of render phase to application
                ReactDOM is a renderer for browsers
            Commiting is syncronous 
                DOM is updated in one go
            after commit phase, workInProgress fiber tree becomes current tree for next render cycle
    
    Key prop
        special prop that we use to tell Diffing Algorithm that an element is unique
        distinguish btw multiple instances of same component
        using keys in list 
            when key stays same across the renders, element will be kept in DOM 
            even if the position in the tree changes
            without key 
                if new element is added to list at first 
                position of previous elements will be changed
                so they are removed and re-created in the DOM (bad performance)
        using keys to reset the state 
            when a key changes between renders, the element will be destroyed and a new one will be created 
            even if the position in the tree is same as before
            used when we are using same component with different props btw rerenders
            to reset the state after re-render we use key prop in such cases.

    Side Effect
        dependency on or modification of any data outside the function scope 
        ex: mutating external variables, HTTP requests, writing to DOM
    Pure function
        function without side effects
        given the same input, a pure function will always return same output
    Render logic 
        code at top level of function component
        participates in describing how component view looks like
        executed every time the component renders
        *Components must be pure when comes to render logic 
        it must produce no side effects
        must not update state (or refs), it creates infinite loop
    Event handling functions 
        executed as consequence of the event that the handler is listening to

    State updates are Batched
        when we have multiple state updates, react will batch all together
        after batched state is updated, re-render will trigger
        automatic batching 
            React 18+
                event handlers
                timeouts 
                promises 
                native events
        opt out automatic batching
            by wraping a state update in ReactDOM.flushSync()
            flushSync lets you force React to flush any updates inside the provided callback synchronously. 
            This ensures that the DOM is updated immediately.
            use: flushSync(callback)
            can significantly hurt performance
    Events in React 
        react performs event delegation for all events in the app
        registers all event handlers on root node 
        Synthetic events 
            wrapper around DOM's native event object
            'e' we get in event handler in react is a Synthetic event
            it fixes browser inconsistencies, so that events works same way in all browsers
        default can not be prevented by returning false, only by preventDefault()
        attach Capture to event, to handle in Capture phase like onClickCapture
    React Hooks 
        Normal Javascript utility functions in React
        allow us to Hook into React internals 
        creating and accessing state from fiber tree 
        registering side effects in Fiber tree 
        Manual DOM selections etc
        allways starts with "use"
        Rules 
            only call hooks at top level 
                do not call hooks inside conditionals, loops, nested functions or after an early return
            only call hooks from react functions
                only inside function components or a custom hook
        useState 
            creates state variables
            takes initial value or a callback function which returns a initial value as an argument
            callback function 
                aka lazy evaluation
                must be a pure function and doesn't take any arguments
            const for variables
                const prevents reassignment and we don't want to manipulate state directly 
                by reassigning it. We want to call the setter function to update state instead.
            we use setter method to update the state variable
            Updating state in react is asyncronous 
                updated state variables are not immediately available after setState call
                but only after re-rendering
            when state variable is updated
                react will re-render the component where that state variable is defined
                function component is called with new state value
                React does not update the const state variable
                const state variable is re-created with new value
            Best practices
                never create useState variable inside 
                    condition
                    loop
                    function in component  
            Updating state based on the previous state
                pass a callback function with state as argument to setState function
                React treat this callback as updater function
                It must be pure, should take the pending state as its only argument, and should return the next state. React will put your updater function in a queue and re-render your component. 
                During the next render, React will calculate the next state by applying all of the queued updaters to the previous state. 
                wrong way: 
                setAge(age + 1);        // setAge(42 + 1)
                setAge(age + 1);        // setAge(42 + 1)
                setAge(age + 1);        // setAge(42 + 1)   
                correct way:
                setAge(a => a + 1);     // setAge(42 => 43)
                setAge(a => a + 1);     // setAge(43 => 44)
                setAge(a => a + 1);     // setAge(44 => 45)
        useEffect 
            it runs after browser paint (component rendered on the browser)
            it takes 2 arguments, callback function and a dependency array  
            callback function will run after component is rendered          
            2nd argument
                no dependency array 
                    callback will be called everytime component renders
                empty dependency array 
                    callback will be called only on initial render (just once)
                non-empty dependency array 
                    callback will be called on initial render and when any of dependencies changes.
            cleanup function (optional)
                u can return a function in useEffect to cleanup 
                it forms a closure with callback function, it can access callback variables/functions
                each effect should only do one thing, makes effects easier for cleanup
                this function will be called before the effect is executed again (btw re-renders)
                and when component is removed/unmounted
                usage: removing setTimeout or setInterval, unsubscribing subscriptions, removing event listeners etc 
                we can cancel/abort the fetch request in cleanup function using AbortController browser API
        layoutEffect 
            it runs before browser paint (component rendered on the browser)
            not used much
        useRef Hook 
            normal variables will reset to their initial value when component re-renders
            lets u reference a value that persistented across renders
            returns an object with value inside mutable "current" property.
            updating ref.current value does not trigger re-rendering 
            u can directly update value like ref.current = ref.current + 1, this won't trigger re-render
            ex: selecting and storing DOM elements like input fields,
                create variables that stays same between renders like previous state, setTimeout id etc 
            do not read or write .current in render logic
            usually perform these actions in useEffect hooks, event handlers etc
            ref updates are synchronous unlike state updates
        useMemo Hook 
            lets you cache the result of calculation between re-renders 
            takes function whose result to be cached, and dependencies for that function
            so it will run that function only when it's dependencies are changed
            it will prevent re-running the heavy functions when re-render is triggered by other
        useCallback hook 
            lets you cache a function defination between re-renders
        custom Hooks 
            re-using non-visual logic 
            compose multiple hooks into our own custom Hook
            to abstract the implementation and modularize code
            file and hook name prefered to start with "use" 
            ex: custom hook to fetch the user data

                

    React Router Dom 
        createBrowserRouter
            used to create config for all paths with associated components
            errorElement
                if any error comes this element will render
                it will given for path '/'
                ex:to render 404 page component if path is not found  
                useRouteError Hook
                    it gives more info about error      
            children routers 
                children property inside a path object
                it takes array of path objects 
                'Outlet' will be replaced with children according to the path    
        RouterProvider
            it will take createBrowserRouter variable as an argument
            we render this on root element instead of App component
        Link component
            navigate to different paths without total page reload
            'to' attribute to give path
            internally Link is using anchor tag, when we see in browser it will be anchor tag
            if we use anchor(a) tags instead of Link, it will reload total page 
        Dynamic paths 
            has :id in the path
            useParams Hook is used to get dynamic value/Id


    Class based Components
        component class extends React.Component class
        render method will return jsx
        props 
            can be accessed from constructor argument
            must pass props to 'super' before accessing them
        state variables
            we create state variables in 'this.state' object inside constructor
            this.setState function to update state variables (update whole 'this.state' object)
        React Class based component LIfecycle
            Render phase
                Constructor
                Render method 
                here everything happens inside vDOM
            Commit phase
                React updates DOM and refs
                componentDidMount
        LIfecycle of parent and child class components
            parent constructor
            parent render 
            child constructor
            child render
            child componentDidMount
            parent componentDidMount
        LIfecycle of parent and multiple child class components
            React Optimization
                react will batch the render phase and commit phase of multiple children together
                1st child render phase 
                2nd child render phase 
                1st child commit phase 
                2nd child commit phase 
            parent constructor
            parent render 
            1st child constructor
            1st child render
            2nd child constructor
            2nd child render
            1st child componentDidMount
            2nd child componentDidMount
            parent componentDidMount
        componentDidUpdate
            called after component is updated (re-rendered)
        componentWillUnmount
            called before component is removed
            used to cleanup 
            ex: removing setTimeout or setInterval etc 
        * componentDidMount is not equivalent to useEffect(internally both are different)
      
    Controlled Elements 
        by default, input elements have their own state in DOM
        in react, we give state to these input elements, 
        now react is controlling the state of input element

    Optimization
        App Chunking / Code Splitting / Dynamic Bundling / lazy loading / ondemand loading
            load the component in a seperate bundle
            divide the bundle file into multiple smaller bundles  
            'lazy' function in react 
                split the component code into seperate bundle file 
                component import is passed as argument to lazy function
            'Suspense' component in react 
                used to defer component loading until bundle file is downloaded
                fallback attribute
                    takes JSX/Component 
                    fallback JSX is rendered until bundle file is downloaded

    Higher Order Components 
        Component that takes a component and returns a component
        used to enhance the components
        this won't modify the code/behaviour of original component
    
    Controlled Components
        parent controls the child component
        then child is controlled component
    Uncontrolled Components
        if component has it's own state and not controlled by it's parent

    props drilling 
        passing props through many components till target component
    useContext in react
        solves props drilling
        lets a parent component provide data to the entire tree below it
        createContext
            to create a context for the data 
            can create multiple contexts 
        useContext
            to access the created context data
            returns an object with data
        Context_Name.Consumer component
            to access the data in context            
        Context_Name.Provider component
            to update the data in context
            all the child components inside the Provider can access the data 
    
    Redux 
        3rd party library alternative to useContext
        it is not mandatory
        it is used to manage state in JS Apps
        easy to debug, redux devtools extension shows actions, trace and state visual etc
    React-Redux
        for react 
    Redux toolkit (RTK)
        gives a standard way of writing redux logic 
    Redux store 
        Big JS object stored in global central space 
        slice 
            small portion in redux store 
            act as a partitions to seperate the data 
            in config, it has data and actions with corresponding reducer functions
            export actions and reducer
            add this reducer in appStore reducer 
        to write data 
            dispatch 'action' 
                after clicking on add button it's dispatch an 'action'
                which calls a function('reducer') which updates slice of redux store 
            reducer function
                takes state and action as an arguments 
                state is current state of slice
                action have data in payload attribute
                used to update the data 
            *Only modify the state object, don't change the reference of state object
            otherwise state won't be updated because redux uses immer library internally
        to read data 
            selector 
                it is useSelector Hook
                to subscribe to the store data
                reads data from slice of redux store
                when data in store changes, it automatically updates the component
                *Only subscribe the data that is needed inside the component (Optimization)
        useDispatch hook 
            to dispatch an action 
    
    Testing 
        Unit testing 
            testing just a single component or function
        Integration testing 
            testing multi components with are integrated/communicate each other 
        End to End (e2e) testing 
            testing userflow 
    React testing library
        it uses DOM testing library and Jest internally
        Jest 
            JavaScript Testing Framework
            Finding Tests
            Running the tests
            Determining whether the tests pass or fail
        Setup(if not used create-react-app)
            Jest need babel dependencies, which will conflict with babel in parcel 
            configure babel for jest.
            so override the default Parcel config for JavaScript to exclude @parcel/transformer-babel
            this will configure parcel to disable Babel transpilation
            This will allow other tools to continue using your Babel Config
            Configure jest 
            install jsdom 
    it() is same as test() in test cases 
    when multiple elements present use function with All to check in screen 
    describe is used to group multiple test cases 
    component with state updates and async testing 
        wrap render inside act function
    jest.fn()
        takes mock function as a callback in argument

    beforeAll 
        it will run before all test cases run
    beforeEach 
        it will run before each test case runs 
    afterAll 
        it will run after all test cases run
    afterEach 
        it will run after each test case runs 
    
    
    //Debouncing in React,we create useState for search input value 
    useEffect(()=>{
        const timer = setTimeout(()=>getSearchData(),300);
        // while typing, this component rerenders and useEffect is called
        // while component is unmounting, we remove the timer
        return {
            clearTimeout(timer)
        }
    },[searchText])

     

    
    

        











        
*/

const App = () => {

    const [userName,setUserName] = useState("default");

    useEffect(()=>{
        // fetch user info  and update the context 
        setUserName("Sunny");
    },[])
  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
        <div className="app">
        <Header />
        <Outlet />
        </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        errorElement:<Error />,
        children:[
            {
                path:'/',
                element: <Body />
            },
            {
                path:'/about',
                element: <About />
            },
            {
                path:'/contact',
                element: <Contact />
            },
            {
                path:'/grocery',
                element: <Suspense fallback={<h1>Huge component is loading</h1>}><Grocery /></Suspense>
            },
            {
                path:'/restaurant/:resId',
                element: <ResMenu />
            },
            {
                path:'/cart',
                element: <Cart />
            }
        ]
    }
])
root.render(<RouterProvider router={appRouter}/>);