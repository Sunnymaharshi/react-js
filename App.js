import React from 'react';
import ReactDOM from 'react-dom/client';
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