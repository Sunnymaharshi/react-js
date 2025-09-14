/*
    Type vs Interface 
        use type when building application
        use interface when building libraries 
        not much difference btw them
    Types 
        string 
        number 
        boolean 
        arrays 
            ex: string[]
    specific values 
        ex: status : 'loading' : 'success' : 'error'
    optional prop (?)
        ex: status? : string
    react types
        component as children prop 
            ex: children: React.ReactNode 
        event handlers 
            function returns nothing 
                ex: handleClick: () => void
            event passed as arg 
                ex: handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        styles prop 
            ex: styles: React.CSSProperties 
        destructuring props 
            ex: ({status}: StatusProps)
        useState value
            primitives 
                automatically added type from initialValue 
            objects
                ex: useState<AuthUserType | null>(null)
                if object always gets initialised 
                    useState<AuthUserType>({} as AuthUserType)
        reducer func in useReducer 
            reducer(state: CounterState,action: CounterAction){}
            type based on action 
            type UpdateAction = {
                type: 'increment' | 'decrement'
                payload: number
            }
            type ResetAction = {
                type: 'reset'
            }
            type CounterAction = UpdateAction | ResetAction
        useRef 
            useRef<HTMLInputElement>(null)
            useRef<number | null>(null)
            null! if it never be null 
        passing component
            component: React.ComponentType<PropsType>
        HTML Elements component props 
            React.ComponentProps<'button'>
        use other component props type 
            React.ComponentProps<typeof Counter>
    Generic types 
        type ListProps<T> = {
            items: T[]
        }
        ListProps<T extends string | number>
*/
