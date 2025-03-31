/*
Micro Frontends 
    divide a monolithic app into multiple, smaller apps 
    each smaller app is responsible for distinct feature of the product 
    Why to use micro frontends? 
        multiple engineering teams can work in isolation 
        each smaller app is easier to understand and make changes to 
    Types of integration 
        container app 
            sub_app_1
            sub_app_2...
        here container, sub_apps are micro frontends 
        build time integration 
            compile time integration 
            before container app load into browser it gets access to sub_app
            ex: publish sub_app as npm package
            container app installs sub_app while building 
            pros 
                easy to setup 
            cons 
                container has to be redeployed everytime sub_app is updated 
                tempting to tightly couple container and subapps 
        run time integration 
            client side integration
            after container app load into browser it gets access to sub_app
            ex: container app deployed to app.com 
            sub_app deployed to app.com/sub_app.js 
            container app fetches sub_app from above path 
            pros 
                sub_app can be deployed independently at any time 
                different versions of sub_app can be deployed and container can choose 
            cons 
                tooling and setup is more complecated 
        server integration
            while sending JS to load Container app to browser 
            server decides on whether or not to include sub_app source 
    Webpack ModuleFederation Plugin
        container config (Host)
            new ModuleFederationPlugin({
                name:'container',
                remotes:{
                    products: 'products@http://localhost:8081/remoteEntry.js'
                },
            })
            name
                used only when fetching files from remote
            remotes 
                lists available packages from remotes 
                keys are used while importing 
                ex: import 'products/ProductsIndex'
                URL
                    name property in remote webpack config is used  
        products(sub_app) config (Remote)
            new ModuleFederationPlugin({
                name: 'products',
                filename: 'remoteEntry.js',
                exposes: {
                    './ProductsIndex': './src/index'
                },
                shared: ['faker']
            })
            filename
                sets name for manifest file 
            exposes
                alias filenames 
            shared 
                used to share common dependencies btw sub apps 
                must run our sub apps asynchronously
                ex: shared: ['react','react-dom']
                module federation plugin checks versions 
                if shared module version is different, it loads new module 
                instead of shared module 
                singleton loading 
                    loads only one copy of module 
                    shared: {
                        faker:{
                            singleton: true
                        }
                    }
                sharing all dependencies
                    import package.json into variable packageJson
                    shared: packageJson.dependencies 
            following files are generated while building 
            remoteEntry.js 
                list of file that are available from that project 
                directions on how to load them 
            src_index.js 
                version of src/index.js that can be safely loaded into browser 
                similarly creates other needed files/packages. 
    Scoping in CSS 
        Custom CSS you are writing for project 
            CSS-in-JS library
                generates unique css class names
            CSS modules in react 
                generates unique css class names
            namespace all you css 
                give a class or id for root element in the project
                include it in all selectors 
        CSS coming from component library or CSS library 
            use a component library that does CSS-in-JS 
            or manually build css library and apply namespace to it 
    Multi-Tier Navigation (Routing)
        usually we use Browser History for container app 
        and Memory History for all sub apps
            if all use Browser Router, multiple apps tries to update browser url 
            causes issues
        Browser History 
            updates URL path in browser 
        Memory History 
            updates URL path in Memory 
        Syncing History Objects
            if there's a change in Container (Browser Router)
                we need to communicate that down to the subapps (Memory Router)  
                Implementation 
                    return callback from subapp mount function 
                    container passes that to history.listen of Browser Router        
            if there's a change in Sub Apps (Memory Router)
                we need to communicate that up to the Container (Browser Router) 
                Implementation 
                    container passes a callback to sub apps 
                    we pass this callback to history.listen() 
                    callback receives location object which has pathname
                    we use it to update container history object (Browser Router)
        Public path
            need to give public path with host to avoid issue when using nested paths 
            ex: http://localhost:8080/

                


        

*/
