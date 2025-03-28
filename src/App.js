import React, { lazy, Suspense, useEffect, useState } from "react";
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
const Grocery = lazy(() => import("./components/Grocery"));
/*  
React JS 
    It is a Javascript Library for web and native user interfaces.
    React is fast because it does efficient DOM manipulation 
    It uses Reconciliation Algorithm (React Fiber) to check diff of old and 
    new virtual DOMs and then it updates actual DOM
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
    React is Declarative 
    Declarative 
        telling what to do 
        ex: using map function to iterate array 
    Imperative 
        telling what to do and how to do
        ex: using for loop to iterate array 
    React is Component based Architecture 
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
  React.createElement("h2", { id: "child1", key: 1 }, "child1"),
  React.createElement("h2", { id: "child2", key: 2 }, "child2"),
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
        npx executes package without installing it 
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

/*  JSX - (JavaScript XML)
        JSX allows us to write HTML in React. JSX makes it easier to write and add HTML 
        in React.
        it is not valid Javascript
        it is transpiled by babel before it reaches JS Engine
        babel 
            converts JSX to React.createElement
            convert ES6+ Javascript to older browser understandable Javascript
        old JSX transform
            JSX => React.createElement(...)
            so we need to import React in all components 
        new JSX Transform (React 17+)
            use JSX without importing React.
            React 17 introduces two new entry points to the React package that are intended to only be used by compilers like Babel and TypeScript.
            JSX => _jsx(...)
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
            <Parent>
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
                    same position, different element
                        different DOM element is created
                        old components are removed from DOM including state
                    same position, same element
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
    
    Preserving State and Resetting State
        React keeps track of which state belongs to which component based on their place in the UI tree.
        State is tied to a position in the render tree.
        When you re-render a component, React needs to decide which parts of the tree to keep (and update), 
        and which parts to discard or re-create from scratch.
        By default, React preserves the parts of the tree that “match up” with the previously rendered component tree.
        * changing props doesn't resets state (recreate component from scratch)
            since same element at same position, react preserves the state
        React lets you override the default behavior, and force a component to reset its state by passing it a different key
        This tells React that if the recipient is different, it should be considered a different Chat component
        that needs to be re-created from scratch
    
    Key prop
        special prop that we use to tell Diffing Algorithm that an element is unique
        allows react to distinguish btw multiple instances of same component
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
        ex: if we don't use useEffect for fetching data and updating ui, 
        it will cause the function component run infinitely
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
        default behavior can not be prevented by returning false, only by preventDefault()
        use onClickCapture event, to handle event in Capture phase
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
                aka lazy evaluation or lazy initial state
                runs only on initial render
                must be a pure function and doesn't take any arguments
                useful to improve performance issues in some scenarios
                usecase: when you have expensive process to initialize state 
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
                    dependency array should include
                        all state variables, props and context values used inside useEffect
                        reactive values 
                            all above values and any functions/variables that references these values 
                        Do not use Objects or Arrays as dependencies
                            since objects are re-created on each render, and react sees new object as different
                    reduce dependencies
                        no need to include setState or dispatch functions in dependencies as React guarantees them to be state across renders
                        remove function dependencies
                            move function into the effect
                            if function is needed in multiple places, memoize it 
                            if function doesn't reference any reactive values, move it out of component
                        remove object dependencies
                            include only object properties in dependencies
                            if it is not possible, move object out of component or memoize it
                        other 
                            if u have multiple reactive values as dependencies, try using a reducer instead of useState.
                            this will reduce the reactive values
                            
            cleanup function (optional)
                u can return a function in useEffect to cleanup 
                it forms a closure with callback function, it can access callback variables/functions
                each effect should only do one thing, makes effects easier for cleanup
                this function will be called before the effect is executed again (btw re-renders)
                and when component is removed/unmounted
                usage: removing setTimeout or setInterval, unsubscribing subscriptions, removing event listeners etc 
                we can cancel/abort the fetch request in cleanup function using AbortController browser API
        uselayoutEffect Hook
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
            usage: <input ref={ref_name} />
            in useEffect, ref_name.current.focus()
        useReducer Hook 
            similar to useState hook but for complex state updations
            lets you add a reducer to your component.
            takes reducer, initialArg, init(optional) as arguments            
            reducer 
                function that specifies how the state gets updated. It must be pure, 
                should take the "state" and "action" as arguments, and should return the next state. 
                State and action can be of any types.
                do not modify the state, state is read only, always return new state from reducer
            initialArg
                value from which the initial state is calculated. It can be a value of any type. 
                How the initial state is calculated from it depends on the next init argument.
            init (optional)
                initializer function that should return the initial state. 
                If it’s not specified, the initial state is set to initialArg. 
                Otherwise, the initial state is set to the result of calling init(initialArg)
            Returns 
                returns an array with exactly two values
                state and dispatch function
                dispatch function
                    lets you update the state to a different value and trigger a re-render.
                    action is only argument to dispatch function
                        action performed by the user. It can be a value of "any type". 
                        By convention, an action is usually an object with a type property identifying it and, optionally, other properties with additional information.
                        ex: dispatch({type:"increment_age", value:2})
                        dispatch(2) is also valid since we can pass value of any type as an action
            React will set the next state to the result of calling the reducer function you’ve provided 
            and the action you’ve passed to dispatch.
            dispatch function only updates the state variable for the next render just like useState.
        useMemo Hook 
            lets you cache the result of calculation between re-renders 
            takes function whose result to be cached, and dependencies for that function
            so it will run that function only when it's dependencies are changed
            it will prevent re-running the heavy functions when re-render is triggered by other
        useCallback hook
            same as useMemo expect it 
            lets you cache a function defination between re-renders 
        useMemo and useCallback use cases 
            Memoize props to prevent wasted re-renders (together with memo function)
            Memoize values to avoid expensive re-calculations on every render
            Memoizing values that are used in dependency array of different Hook
            React by default memoizes state settter functions (setState)
            * only use these when it truly improves the performance, do not use these everywhere 
            as these needs to cached in memory
        useDeferredValue Hook 
            lets you defer updating a part of the UI.
            takes value, initialValue?
            it defers the value u have passed 
            ex: const [query, setQuery] = useState('');
            const deferredQuery = useDeferredValue(query);
            React will first attempt a re-render with the old value (so it will return the old value), and then try another re-render in the background with the new value (so it will return the updated value).
            it always trys to render with latest value in background
            if value is updated, it stop previous render and renders again with new value 
            in background
        useTransition Hook 
            lets you render a part of the UI in the background.
            returns isPending, startTransition function 
            this function lets you mark updates as transition 
            startTransition(() => {
                setProducts(products);
            });
        custom Hooks 
            re-using non-UI logic which uses Hooks
            compose multiple hooks into our own custom Hook
            it can have arguments just like a function, not props like a component
            to abstract the implementation and modularize code
            file and hook name prefered to start with "use" 
            ex: custom hook to fetch the user data

        Context API in react
            prop drilling 
                passing props through many components till target component
            it solves props drilling
            pass data throughout the app without manually passing props down the tree
            Provider
                gives all child components access to value
                usually value will be state or functions
                createContext Hook
                    to create a context for the data 
                    can create multiple contexts
                    ex: const UserContext = createContext();
                Provider 
                    provide the context data to all children Components
                    ex: <UserContext.Provider value={{username:"xyz"}}>
                            <Main />
                        </UserContext.Provider>
            Consumer
                all components that read the provided context value
                whenever context value updated, all the consumer components will be re-rendered
                useContext Hook (new way to consume data)
                    to access the created context data
                    returns an object with data
                    ex: const user_data = useContext(UserContext) 
                Consumer (older way to consume data)
                    <UserContext.Consumer>
                        {username => (
                            <Main data={user_data} />
                        )}
                    </UserContext.Consumer>
            create different contexts for different states to prevent wasted re-renders
                

    React Router Dom 
        createBrowserRouter
            used to create config for all paths with associated components
            Error handling
                if any error comes, a component can be shown.
                component to show when error comes is given in errorElement property
                ex:to render 404 page component if path is not found  
                useRouteError Hook
                    it gives more info about error      
                ex: router = createBrowserRouter([
                    {
                        path: "/",
                        element: <Home />,
                        errorElement: <ErrorPage />,
                    },
                ]);
            children routers 
                children property inside a path object
                it takes array of path objects 
                'Outlet' will be replaced with children according to the path
               
        RouterProvider
            it will take createBrowserRouter variable as an argument
            we render this on root element instead of App component
            ex: <RouterProvider router={router} />
        Link component
            navigate to different paths without total page reload
            'to' attribute to give path
            internally Link is using anchor tag, when we see in browser it will be anchor tag
            if we use anchor(a) tags instead of Link, it will reload total page 
        NavLink
            it is a special kind of Link that knows whether or not it is "active", "pending", or "transitioning".
        Programatic Navigation
            useNavigate Hook is used to navigate to URL through JavaScript instead of Link
            ex: const navigate = useNavigate(); navigate("contact");
            we can navigate back by passing negative value to navigate
            -1 means 1 back, -2 means 2 backs, positive value do opposite of back navigate
        Dynamic paths 
            has :id in the path
            useParams Hook is used to get dynamic value/Id
            ex: const [id] = useParams();
            we can also add query strings same way just as query parameter with ? before :id
            useSearchParams Hook is used to get the query strings from URL.
            ex: const [searchParams,setSearchParams] = useSearchParams(); searchParams.get('query_parameter');
            setSearchParams function returned from hook is used to set the query strings
        Nested routes 
            can declare using JSX with Route component or objects with children property
            index property 
                index routes render into their parent's Outlet at their parent's URL (like a default child route).
            ex:{
                path: "/",
                element: <Root />,
                children: [
                {
                    path: "contact",
                    element: <Contact />,
                },
                {
                    index:true,
                    path: "dashboard",
                    element: <Dashboard />,
                    loader: ({ request }) =>
                    fetch("/api/dashboard.json", {
                        signal: request.signal,
                    }),
                }]
            }
            Outlet component
                children route component is rendered in place of this Outlet
            useOutletContext
                share data between parent and child routes
                pass data into Outlet using context property
                use Hook to access context data inside child 
                ex: <Outlet context={{username:"user123"}}
        Protected Routes 
            create a component and check auth in useEffect, 
            navigate to home if user is unauthenticated
            Make this component parent of all protected route components
        Loaders
            used to fetch data and pass data to the component on particular route
            as soon as we go to the route, loader will run along with component rendering 
            we pass the function which fetches data to path using loader property
            ex: {
                path:"/",
                element:<Home />
                loader: dataLoader
            }
            useLoaderData Hook 
                to get the data in component that has been fetched by loader
        Actions
            can submit data to servers
            Form component from react router is used 
            
        useFetcher Hook 
            used to fetch data of a route without navigating to that route
        useNavigation Hook 
            used to know if any of the component is loading in the app 
            returns an object which include state property
            state 
                idle 
                loading


    CSS Modules 
        one external file per component
        styles in file are scoped to only that component
        file name: {Component_Name}.module.css
        we can only use class names, not any html elements to write CSS 
        if we write css for html elements, it will be applied to all those elements in the app
        file content: .btn {
            color:red;
        }
        import
            import styles from "./Home.module.css"
        usage 
            className={styles.nav}
        React will add unique id after class name to avoid naming clashes
        global function 
            it is used to make a class global (available in total app)
            ex: :global(.nav){}

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

    Portal in react-dom 
        used to place the component anywhere in the DOM tree.
        it does not change React component tree
        createPortal function
        1st argument
            JSX 
        2nd argument
            element in which u want to render the JSX
            ex: document.body
        usecase: notification popups, modals etc 
        so it wont affected by root element styles etc 
    Performance Optimization
        Reduce wasted re-renders
            wasted render 
                render that didn't produce any change in DOM
                react dev tools profiler can be used to find which component rendered and why it is rendered
                component re-renders when 
                    state changes 
                    change in context that component is subscribed to
                    parent component re-renders
                    *changing props does not resets state (recreate component from scratch)
                    since same element at same position in element tree, react preserves the state
            1. passing slow components as a children or through props to parent component
                lifting components up
                Assume we have a very slow component that performs an expensive "calculation" or "renders" a huge List
                when state is changed in parent component, it triggers re-render and 
                slow component inside parent also re-renders.
                if slow component doesn't depends on state of parent component
                we can pass the slow component as a children, 
                react first creates slow component and pass it to parent
                ex: <Parent>
                        <Slow />
                    </Parent>
                even if parent component is re-renders, since slow component is already created  
                and passed as a prop, react doesn't re-render slow component again
                *same happens in context change also, since we pass all child components as children 
                only components which are consuming the context gets re-rendered
                    ex: <UserProvider>
                            <App />
                        </UserProvider>
            2. Memoization
                Optimization technique that executes a pure function once, and saves/caches result in memory
                if we try to execute same arguments as before, saved result will be returned without executing func again
                memo function in react
                    Memoize components. it is only for props, if state changes, component will rerender
                    used to create a component that will not re-render when it's parent re-renders as long as 
                    props stay same btw rerenders
                    above optimization can be achived with memo function also
                    lets you skip re-rendering a component when its props are unchanged.
                    But React may still re-render it: memoization is a performance optimization, not a guarantee.
                    only memoize heavy or slow rendering components
                    component argument
                        component that you want to memoize
                    arePropsEqual argument (optional)
                        A function that accepts two arguments
                            the component’s previous props, and its new props. 
                            It should return true/flase by comparing props 
                        By default, React will compare each prop with Object.is.
                    returns 
                        a memoized version of that component that will skip rerenders 
                        as long as the props of this component didn't change over rerenders.
                    it will still re-render when its own state changes.
                    Wrap a component in memo to get a memoized version of that component. 
                    ex: const MemoList = memo(function List(props) {...})
                    Issues with memo function
                        In react, everything is re-created on every render including objects and functions
                        In JS, two objects or functions that look the same, are actually different (memory location is different)
                        if objects or functions are passed as props, child component will always see them 
                        as new props on each re-render 
                        if props are different, memo won't work 
                    Fix 
                        we can use useMemo and useCallback to memoize objects and functions
                useMemo Hook 
                    Memoize objects
                useCallback
                    Memoize functions   
            
            3. Optimize context re-renders
                if parent of Provider re-renders, value we're passing through Provider also will be re-created
                so all the comsumers of Provider will re-render 
                memoize the value object using useMemo to prevent wasted context re-renders 

        Code Splitting / lazy loading  / ondemand loading
            Code Splitting / App Chunking / Dynamic Bundling
                spliting app bundle into multiple parts that can be downloaded over time when needed 
            Lazy loading  / ondemand loading
                process of loading code ondemand or when needed  
                React.lazy function
                    lets you defer loading component’s code until it is rendered for the first time.
                    While the code for the lazy component is still loading, it suspends component render
                    split the component code into seperate bundle file 
                    dynamic import() callback function is passed as argument to lazy function
                    ex: const Home = lazy(()=> import('./Home'))
                React.Suspense component
                    lets you display a fallback until its children have finished loading.
                    fallback attribute
                        takes JSX/Component 
                        fallback component is rendered until bundle file is downloaded
                        usually spinner components are used for fallback to show loading status
                    ex:<Suspense fallback={<Loading />}>
                            <Home />
                       </Suspense>
                while building, bundler will create seperate bundle files for these components

    Higher Order Components 
        Component that takes a component and returns a component
        used to enhance the components
        this won't modify the code/behaviour of original component
        used to add additional features to the component
    
    Controlled Components
        parent component is responsible for managing child component state
        then child is controlled component
        ex: state is received from parent component
    Uncontrolled Components
        if component manages it's own state and not controlled by it's parent
        ex: only has it's own state 
 
    React Error Boundaries
        to avoid white screen whenever error comes in our app
        we can give a fallback component to render when error comes 
        it only catches errors while react is rendering
        it does not catch errors in event handlers and useEffect etc
        react error boundary library
            component receives error info and resetErrorBoundary function as a props 
            resetErrorBoundary is used to reset the app             
            usage: 
            <ErrorBoundary FallbackComponent={ErrorComponent}>
                <App />
            </ErrorBoundary>

    Redux 
        3rd party library to manage global state (ui state/client side)
        alternative to useContext + useReducer
        it is not mandatory, use only when u are managing large global state
        easy to debug, redux devtools extension shows actions, trace and state visual etc
    React-Redux
        for react 
    Redux toolkit (RTK)
        gives a standard way of writing redux logic 
        modern way of writing redux
        lot less code than classic redux 
        follows best practices
        classic redux and toolkit are compatible with each other,
        we can change some code to toolkit and redux works fine
        Redux store 
            Big JS object stored in global central space
            configureStore is used to create a store
            all slices reducers will be added to store
            automatically adds thunk Middleware to the store
            ex:appStore = configureStore({
                reducer: {
                    counter: counterReducer,
                },
            })
        Provider
            wrap parent component we want to share the store with Provider
            pass appStore into store prop
        slice 
            small portion in redux store 
            used to separate data and it's actions & reducers according to it's usage
            in config, it has data and actions with corresponding reducer functions
            export actions and reducer
            add this reducer in appStore reducer 
            ex: userSlice, accountSlice etc
            reducer function
                must be a pure function (no side effects)
                takes state and action as an arguments 
                state is current state of slice
                action object have data in payload attribute
                contains logic for updating store as per the action
                *Only modify the state object, don't change the reference of state object
                otherwise state won't be updated because redux uses immer library internally
                to change total state, return new state in the reducer
                ex: userSlice = createSlice({
                    name:'user',
                    initialState,
                    reducers:{
                        createUser: (state,action)=>{...}
                    }
                })
                prepare function
                    used to send custom arguments to reducer 
                    take payload and returns new arguments to reducer
        to write data 
            useDispatch Hook 
                returns dispath function which is used to dispatch an 'action' 
                takes an action and payload as arguments
                ex: dispatch(createUser(),{username:"Sunny"})            
        to read data 
            useSelector Hook 
                to subscribe to the store data
                reads data from slice of redux store
                when data in store changes, it automatically re-renders the component which subscribed to that data
                *Only subscribe the data that is needed inside the component (Optimization)
                ex: data = useSelector((store)=>store.user)  
        Redux Middleware 
            sit between dispatching the action and store
            allows u to run code after dispatching but before reaching the reducer in the store 
            used for 
                async operations
                    like API fetch as we can't have side effects in reducers
                timers,logging etc 
                place for side effetcs
            Redux Thunk 
                allow us to write additional Redux-related logic separate from a UI layer. 
                used to write async operations and other side effetcs
                configure thunk in redux store 
                ex: appStore = configureStore({
                    reducer: {
                        counter: counterReducer,
                    },
                    applyMiddleware(thunk)
                })
                we will return a async function inside reducer instead of state
                redux will see it as a Thunk 
                this function will receive dispatch and getState functions as arguments
                after fetching, we can call this dispatch to update the store
                createAsyncThunk
                    to create async thunk
                    takes action name and async function as arguments
                extraReducers
                    to configure async thunk to slice
                    builder 
                        lets u handle cases for thunk 
                        like loading, fulfilled and rejected etc
                        
        Context + Reducer vs Redux
            Context 
                built into react
                easy to setup
                additional slice requires new context setup from scratch
                no support for async operations
            Redux 
                additional library (increases bundle size)
                more work to setup
                additional slice is easy to create 
                Supports Middleware for async operations

    React Query library
        used to manage remote(server) state 
        Data is stored in cache 
        Automatic loading and error states 
        Automatic re-fetching to keep state synched 
        Pre-fetching data (data that will be used in future)
        Easy remote state updation 
        Offline support
    
    Advanced React Patterns
        Reusability
            UI 
                components and props
                children prop 
                    to customize component content 
            Stateful Logic 
                Custom Hooks
        Render Props pattern
        Higher Order component pattern
        Compound component pattern 
            set of related components together achieve a task
            uses Context API
            1.create context
            2.create parent component
            3.create child components 
            4.provide context to parent
            5.use context in child components to access parent data
            6.add child components as properties to parent component
            flexible in positioning child components
            use case: Modal component, Counter component
            example:
                <Counter>
                    <Counter.Label>
                    <Counter.Decrease icon="-"/>
                    <Counter.Count />
                    <Counter.Increase icon="+"/>
                </Counter>

                
    
    Testing 
        Unit testing 
            testing just a single component or function
            mock any dependencies, test only internals
            testing done in isolation
        Integration testing 
            testing multi components with are integrated/communicate each other 
        Behavioral Testing 
            testing a behaviour, include all units in that behaviour 
        End to End (e2e) testing 
            testing userflow like navigating to pages and perform actions
    Test Driven Development (TDD) - red green testing
        write tests before writing code 
        then write code to page the tests 

    React testing library - @testing-library/react 
        creates virtual DOM for testing and utilities for interacting with DOM 
        uses ReactDOM to render a component for testing 
        like render, fireEvent, waitFor, screen
        doesn't support E2E testing
    @testing-library/user-event
        simulate user input like typing and clicking
        sumulates events like user interaction 
        uses fireEvent internally
        prefer to use user-event instead of fireEvent
        ex:user.click(btn_variable)
    fireEvent
        dispatches exactly the events you tell it to
    @testing-library/dom
        find elements that are rendered
    Jest 
        JavaScript Testing Framework, open-source test runner
        Finding Tests
            files end with .spec.js or .test.js 
            files inside __test__ folders 
        Running the tests
        Determining whether the tests pass or fail, test reports 
        when u enter command npm test or npm run test it is jest responsibility that
        collect all the files ending with .test.js and runs each test case and show
        pass and fail results in your console
    vitest 
        test runner, alternative to jest 
        no need to change tests code 
        just configuration changes 
    jsdom 
        simulates a browser when running in a node environment 
    test()
        to write test case 
        it() is same as test() in test cases 
        ex: test("3 products should be present by default",  ()=>{// code to test})
        Focusing and Excluding Tests
            replace it with
            xit() to temporarily exclude a test from being executed.
            fit() lets you focus on a specific test without running any other tests.
    render()
        to render the Component
    screen
        gives access to dom via query functions 
        prefer to use ByRole always, to be sure app is following Accessibility
        getByRole() or getAllByRole()
        get by tag name like button, heading etc
        when multiple elements present use function with All
        Aria Roles 
            heading -> h1,h2,h3...
            list -> ul, li 
            button -> button 
            link -> a 
            textbox -> input, type='text'
        getBy 
            throw error if not found or found more than 1
            used to prove element exists
        queryBy 
            returns null if not found or found more than 1
            used to prove element not exists
            since getBy throws error before assertion happens
        findBy 
            runs asynchronously (returns promise)
            if not found throws error or found more than 1
            checks until 1 sec is passed by default 
        getAllBy
            not found, throws error 
        queryAllBy 
            not found, return []
        findAllBy 
            not found, throws error
        within
            to find within an element
            ex:within(screen.getByRole("form")).getByRole("textbox")
    screen.debug()
        prints the DOM
    screen.logTestingPlaygroundURL()
        logs url with html encoded
        helps in finding right query functions
        when u can't find right Role Query 
            add data-testid attribute for parent and use within() or 
            use querySelector
    logRoles()
        takes container returned by render()
        logs all roles in the component
    expect()
        asserts the condition, comes from jest 
        ex: expect(titles).toHaveLength(6)
        custom matcher 
            can create function to match 
            ex: expect.extend({customtoContainRole})
    jest-dom library 
        like toBeInTheDocument(), toHaveClass() etc 
    describe()
        is used to group multiple test cases 
        nest the tests and run them isolated 
    component with state updates and async testing 
        wrap render inside act function
    jest.fn()
        takes mock function as a callback in argument
    beforeAll 
        it will run before all test cases run
    beforeEach 
        it will run before each test case runs 
        not recommend to render in these functions
    afterAll 
        it will run after all test cases run
    afterEach 
        it will run after each test case runs 
    Mock Functions 
        fake function 
        records whenever it get called, including arguments
        used to asserts if function gets called with right arguments 
    Module Mocks 
        fake component 
        ex: jest.mock('./CardDetail.js',()=> 'fake comp')
    Act() Functions 
        react testing library uses it behind the scenes 
        to solve act warnings use findBy or waitFor matchers 
        we don't need to use it, if we are using RTL 
        when there is eventually change in state, we wrap the test 
        with ACT function 
    Mock Service Worker (MSW)
        API mocking library, to simulate server response 
    Testing component wrapped in a Provider 
        ex: render(<Home/>,{wrapper: UserProvider}) or 
        can create custom render function with Provider  

    //Debouncing in React,we create useState for search input value 
    useEffect(()=>{
        const timer = setTimeout(()=>getSearchData(),300);
        // while typing, this component rerenders and useEffect is called
        // while component is unmounting, we remove the timer
        return {
            clearTimeout(timer)
        }
    },[searchText])

    Typescript in React
        Functional component
            React.FC or React.FunctionComponent
            must return JSX
        Interface is used to define structure of objects like props
        Generic function type for React.FC
            interface PropsInterface {
                name:string;
                price:number;
            }
            const Product:React.FC<PropsInterface> = (props)=>{}            
        Generic function type for useState
            useState<SomeInterface>()
        
    Webpack 
        bundler
        used to bundle the files together
        optimizes the code (Minification)
    Client side rendering (CSR)
        HTML is rendered(generated) on client(browser) using JavaScript
        best for highly interactive web apps
        Apps that don't need SEO
        Pros 
            Highly Interactive 
                all code and content has already been loaded (except data)
        Cons 
            Slow initial page loads 
                bigger JavaScript bundle needs to be downloaded before app starts
                Data fetched after components mounts
            SEO might be problematic 
                content is not generated until JS is downloaded and executed
                so search engines might find a blank page when they try to index the site
    Server side rendering (SSR)
        HTML is rendered(generated) on server
        best for Content-driven websites or apps where SEO is essential 
        like E-commerce, blogs, news, marketing website etc
        Types 
            Static
                HTML is generated at build time (only once)
                static site generation
            Dynamic
                HTML is generated each time server receives new request                
        Pros
            Faster initial page loads 
                Less JavaScript code needs to be downloaded and executed
                Data is fetched before HTML is generated
            SEO-friendly
                Content is easier for search engines to index 
        Cons 
            Less Interactive
                Pages might be downloaded on demand and require full page reloads 
    
    Next.js
        React Framework
        Built on top of React 
        Opinionated way of building react apps 
            no need to install extra libraries like react-router-dom etc 
        Features 
            Server Side Rendering 
                Dynamic or static can be selected for each route
            File-Based Routing Conventions
                Folders as routes 
                Special files for pages,layouts,loaders etc
                Types 
                    App Router 
                    Pages Router (legacy)
            Data Fetching and Mutation on Server
                Fetching data directly in Server components
                Mutations in Server Actions 
            Optimizations
                Images,Fonts,SEO,Preloading
        App Router
            creates routes automatically based on folder structure
            pages and components needs to be defined inside "app" folder
            ex: app/home/page.js 
            to opt out route for a folder, we can add _ before folder name
            usage: components folders which does not need route
            layouts
                file convention layout.js
                pages will automatically passed as children to the layout
                this return html tag with body tag inside of it
                we can define site metadata in layout by exporting a metadata object
                we can do same for other pages also to define custom metadata
                ex: export const metadata = {
                    title:"My website"
                }
            pages
                file convention about/page.js
                this folder structure will create route for about                
            components
                file convention _components/Navigation.js
            Link component
                similar to Link in react-router-dom 
                here we use "href" instead of to for path            
            Nested Routes 
                to create a nested routes inside a route 
                we simple create a layout file in that folder/router
                children property is used to get child route component inside layout 
                like Outlet in react-router-dom
            Dynamic routes 
                create folder with name like "[userId]" and page.js inside it
                here userId is used to get dynamic value in that route 
                "params" prop will have this dynamic value with name we given to tha folder

            loading.js file 
                render this component while loading route/page
                this file in app folder used as global loading component
                this file in a folder/route used as loading component for that route
            React Suspense
                is used to have fallback component while lazy loading the component
                it is hard to implemente Suspense for async operations (fetching data) in component
                so we use libraries like React Query, Next.js
            React Suspense in NextJS 
                we can use Suspense component to have a fallback component(loading comp)
                while data fetching (Async) inside a component  
                used for component(SC/CC) level loading as we have loading.js file for route level
            Creating API Endpoints with "Route Handlers" 
                create new folder without page.js
                create route.js file
                export async GET or POST functions
        Error Boundaries
            error.js in app folder for global error boundary
            must be a client component
            whenever application encounters an error this error.js component will be rendered
            we can error boundaries for pages/routes same way
            only rendering errors caught here 
            errors in event handlers, useEffect can't be caught here
            not found errors 
                for invalid URLs we can have not-found.js file in app folder
                to manually trigger the this, we use notFound() function from NextJS 
                we can define this for pages/routes same way
        
        Pages Router (legacy router) - App Router is latest and rocommended
            all components are client components by default
            creating routes 
                create a file just with name of the route in pages folder
                ex:pages/home.js 
            root route 
                index.js file in pages folder
            nested routes 
                create a folder with route name 
                and we can create sub routes and index.js in it
            dynamic routes 
                create a file with dynamic variable name in brackets 
                ex:pages/user/[userId].js
            meta data 
                passed in Page JSX using Next.js Head component 
                ex:<Head><title>Home</title></Head>
            getStaticProps function
                whetever code is there in this function executed in server 
                we export this function inside a component/page 
                used for data fetching
            getServerSideProps function
                used for components which uses dynamic route 
            API Routes 
                used to mutate data in server 
                create folder named api in pages folder 
                we export a handler function to handle the requests


        Cons of normal react components (100% Client-Side)
            require lot of JS code need to be downloaded
            Client server data waterfall
                when data from one component depends on data fetched in another component
        Server side rendering (100% Server-Side)
            No components
            easy and fast to fetch all data 
            close to data source
            Needs to ship 0kb of JS code

        React Server Components(RSC)
            new full-stack architecture for React apps
            we write frontend code next to backend code
            RCS is not active by default in new React apps like vite apps,create-react-app etc 
            it needs to be implemented by a framework like Next.js(app router), Remix etc
            Server-client Boundary 
                when we use "use client;" in a component,
                all it's child components also become client component
                so this will become boundary between server and client components
            Client Component
                must add "use client" in a component to make it client side component
                regular react components
                usage:components that have interactivity (JS code)
                1.Have State or Hooks
                2.Have lifting state up
                3.Have Props
                4.Data Fetching is possible
                5.Can Import
                    Only client components
                    can't cross client-server boundary
                6.Can Render
                    Client and server components passed as props
                7.When re-render?
                    On State change
            Server Components
                default components in apps that use RSC architecture like Next.js 
                components that are only rendered on the server
                don't make it to bundle(0kb)                               
                usage: components that doesn't have interactivity (no JS code)
                1.Don't have State or Hooks
                2.Don't Have lifting state up
                3.Have Props 
                    but must be serializable when passed to client components
                    No functions or classes (not serializable)
                4.Data Fetching is possible
                    Preferred in server components
                5.Can Import 
                    Client and server components
                6.Can Render
                    Client and server components
                7.When re-render?
                    On URL change (navigation)
            
            React Server Components(RSC) Architecture Pros and Cons 
                Pros 
                    can build entire full stack apps with React components alone (+ server actions)
                    One single code base for frontend and backend
                    Server components have more direct and secure access to data source 
                        no API, no exposing API keys 
                    Eliminate client-server waterfalls 
                        by fetching all data needed for a page at once before sending it to client
                    Disappearing code 
                        server components ship 0 JS code 
                        so they can import huge libraries without increasing bundle size 
                Cons 
                    Makes React more complex 
                    More things to learn 
                    Things like Context API don't work in server components
                    More decisions for choosing btw server and client for components and data fetching 
                    Sometimes U still need to build an API (for ex if u have a mobile app)
                    can only be used within a framework
            React Server Components(RSC) works behind the scenes
                how component tree (both client and server components) renders?
                render phase is split into two steps
                1.Server-Side
                    first all server components will render in server  
                        server component code disappears 
                        that's why we can't have state or hooks in server components 
                        output: React Element for each server Component
                        now component tree holds React Elements for all server Components
                    "Hole" or placeholder for client components
                        client components in component tree will have a placeholder(Hole) 
                        where client components will render 
                        each of these Hole or placeholder holds 
                            Serialized props passed from Server components to client components
                            URL to script which contains code of the client component
                    RSC Payload 
                        output of above steps 
                        virtual DOM of SCs + Component Trees of CCs 
                        this is sent to client (browser)
                2.Client-Side 
                    client components in RSC Payload will run in client
                    leads to complete Virtual DOM 
                These steps don't wait for one another, completed render work is streamed to client
                Now this vDOM commits to form actual DOM Elements 
        Static Rendering 
            HTML is rendered at built time, or periodically in background by 
            refetching data (Incremental Static Regenration)
            useful when data doesn't change more often and is not personalised to user 
            usage: product page
        Dynamic Rendering 
            HTML is generated at request time
            used when data changes frequently and is personalised to user 
        When NextJS Switches to Dynamic Rendering
            NextJS will automatically switch to dynamic rendering 
            1.when route has dynamic segment (uses params)
            2.searchParams are used in the page component
            3.headers or cookies used in any of route's server component
            4.uncached data request is made in any of routes server component
            we can force Next.js to render a route dynamically
                1.export const dynamic = 'force-dynamic'; from page.js
                2.export const revalidate = 0; from page.js
                3.{cache:'no-store'} added to fetch request in any of route's server components
                4.noStore() in any of route's server components
        Converting Dynamic routes to static 
            we use generateStaticParams() to provide all possible values for dynamic route 
            ex: export function  generateStaticParams() {
                return [
                    {userId:'1'},
                    {userId:'2'},
                    {userId:'3'}
                ]
            }
            here userId is dynamic value in the route
            Next.js will prerender all the dynamic routes
            usefull when we have finite set of values for the dynamic routes
        Static Site Generation (SSG)
            if all routes in app are static, we can generate static site code 
            next.js can generate static build for the app.
        Partial Pre-Rendering  (PPR) (experimental)
            Most pages don't need to be 100% static or 100% dynamic
            this strategy combine both static and dynamic rendering in same route 
            A pre-rendered (static) page is served immediately from a CDN, leaving holes for dynamic content
            need to be turned on in next.js config 
            Dynamic components should be placed inside Suspense
        Caching in NextJS
            NextJS caches very aggressively, everything that is possible to cache, is cached 
            NextJS provides APIs for cache revalidation
                removes data from cache and updating it with fresh data 
            Makes app more performant and saves costs 
            Caching is always on by default
            Caching happens in production env only not in development env
            Mechanisms
                Request Memoization 
                    kept in server
                    Data fetched with fetch function
                    Cached for One page request (one render, one user)
                    same fetch in multiple components only makes one request
                    Only in components, not in route handlers and server actions 
                    revalidate: NA
                    opt out:AbortController
                Data Cache 
                    kept in server
                    Data fetched in a route or a single fetch request
                    Caches Indefinitely, even across de-deploys 
                    can revalidate or opt out 
                    used to Data for static pages + ISR(incremental static regeneration) when revalidated
                    revalidate
                        this revalidates Full Route Cache also
                        time based (Automatic) for all data on page 
                            export const revalidate = 60; (page.js)
                        time based for one data request
                            fetch('...',{next:{revalidate: 60}})
                        ondemand (manual)
                            revalidatePath or revalidateTag
                    opt out
                        forces entire page dynamic
                        also opts out Full Route Cache
                        for entire page 
                            export const revalidate = 0; (page.js)
                            or 
                            export const dynamic = 'force-dynamic'; (page.js)
                        for single request
                            fetch('...',{cache:'no-store'})
                        for server component
                            noStore()
                Full Route Cache
                    kept in server
                    Entire static page (HTML + RSC payload)
                    cached until "Data cache" is revalidated or app re-deployed
                    used for static pages 
                    revalidate or opt out are same as Data Cache                   
                Router Cache 
                    kept in client (browser)
                    Pre-fetched and visited pages both static and dynamic
                    stored 30sec (for dynamic) or 5min (for static) throughout one user session
                    SPA like naviagtion
                    revalidate
                        revalidatePath or revalidateTag in Server Action 
                        or
                        router.refresh
                        or
                        cookies.set or cookies.delete
                    opt out
                        Not possible
        Incremental Static ReGeneration (ISR)
            it is in between of static and dynamic pages 
            data is fetched in intervals to keep page updated
            ex: export const revalidate = 3600;
            here page is regenerated every hour in server,
            when user revisits site, will get new page
        Image Optimization
            Image component in next js 
            convert format to webp 
            automatically decide resolution based on screen size
            reduces size 
            lazy loads images 
            images hosted in elsewhere (URLs)
                configure the image URL in next.js config 
                using remotePatterns in images object
            
        Next.js with RSC + Server Actions (SA)
            No clear separation btw frontend and backend
            allows u to build full stack applications in just one codebase 
            No need for an intermediary API in many times 
        Server component inside client component
            it is possible to have server component inside client component 
            using props/children as server components are already executed
        Importing vs Rendering
            client components 
                can import 
                    client components
                can render 
                    server components (passed as props)
                    client components 
            server components
                can import and render both server and client components
                it can be both server and client component
                rendering server component inside client component                  
                    if server component imported first in server component and later if we render it inside 
                    a client component it will become client component
                    ex: import the server component in another server component/page 
                    then pass that server component to client component as prop 
                    now client component can render this server component
        Middleware in Next.js 
            by default, it always runs before every app routes 
            we can specify which paths using a matcher
            ex:middleware.js in project root folder
            it needs to produce a response
            we can 
                redirect or rewrite to a route 
                send response directly (like json)
            used for 
                read and set cookies and headers 
                Authentication and Authorization
                Server-side analytics 
                Redirect Based on geolocation
                A/B testing
        Server Actions 
            make interactive full-stack applications
            needs a running web server
            Async functions that are exclusively run on server 
            allows us to perform data mutations 
            created with "use server" directive at top of the function or entire module
                "use server" is only for sever actions, not for server components
                it creates a bridge for client to connect to sever like Endpoint
            can be used in server component or
            passed to client components (unlike regular functions which is not posssible)
            Behind the scenes
                Next.js creates API Endpoint(with URL) for each server action 
                when server action is called, a POST request is sent to it's URL 
                the server action(function) itself never reaches client
            can be called from 
                action attribute in forms 
                    useFormStatus Hook to show loading indicator
                event handlers in client components 
                    useTransition Hook to show loading indicator
                useEffect in client components 
            can perform 
                data mutations 
                Update UI with new data 
                    revalidating cache using revalidatePath or revalidateTag
                Work with cookies etc
            

            


*/

const App = () => {
  const [userName, setUserName] = useState("default");

  useEffect(() => {
    // fetch user info  and update the context
    setUserName("Sunny");
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
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
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Huge component is loading</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <ResMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
root.render(<RouterProvider router={appRouter} />);
