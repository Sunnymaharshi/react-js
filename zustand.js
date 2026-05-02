/*
    Zustand
        it solves Redux's problems without introducing new one
        no boilerplate, no providers, no action creators, no reducers unless you want them.
        Redux vs Zustand
            Redux philosophy:
                One store → reducers → actions → dispatch → new state
                Strict unidirectional data flow
                Actions are serializable events describing what happened
            Zustand philosophy:
                Store = state + actions together
                No ceremony — just functions that call set()
                Actions are plain functions, not serializable events
        Store 
            ex: const useCounterStore = create<CounterStore>((set) => ({
                    count: 0,
                    increment: (amount) => set(state => ({ count: state.count + amount })),
                    decrement: (amount) => set(state => ({ count: state.count - amount })),
                    reset:     ()       => set({ count: 0 }),
                }));
        The set() Function (The Heart of Zustand)
            shallow merge, don't need to spread state
            ex: set({ count: state.count + amount }) 
            instead of set({ ...state, count: state.count + amount })
        Selectors
            Without selectors, components re-render on every store change.
            ex: useCartStore(state => state.items.length);
        Slice Pattern
            ex: export const createUserSlice = (set) => ({
                    user: null,
                    setUser: (user) => set({ user }),
                    clearUser: () => set({ user: null }),
                });
                const useAppStore = create()((...args) => ({
                    ...createUserSlice(...args),
                    ...createNotificationSlice(...args),
                }));
        Middleware — Persistence, DevTools, Immer
            persist for localStorage/sessionStorage
            devtools for Redux DevTools integration
            immer for immutable state updates with mutable syntax
        Async Actions
            Zustand handles it natively
            ex: fetchUser: async (id: string) => {
                    set({ loading: true, error: null });
                    try {
                        const user = await api.getUser(id);
                        set({ user, loading: false });
                    } catch (error) {
                        set({ error: error.message, loading: false });
                    }
                },
        Cross-Store Communication
            Zustand stores are independent, but you can call one store from another.
            ex: const useCartStore = create((set, get) => ({
                    checkout: async () => {
                        // Read from another store using getState()
                        const user = useAuthStore.getState().user;
                        if (!user) throw new Error('Not authenticated');

                        const { items } = get();
                        await api.checkout({ userId: user.id, items });
                        set({ items: [] });
                    },
                }));
        Testing
            Zustand stores are easy to test — no Provider, no mock store
        Subscribing Outside React
            subscribe to store changes without React components
            ex: const unsub = useCartStore.subscribe(
                    state => state.items,              // selector
                    (items, prevItems) => {            // callback
                        if (items.length > prevItems.length) {
                        analytics.track('item_added', { count: items.length });
                        }
                    }
                );
        Pros 
            Minimal boilerplate
                No action types, action creators, or reducers.
            No Provider required
                Store is a hook — works anywhere.
            Flexible architecture
                Can be as simple or structured as needed.
            TypeScript support
                First-class TypeScript support with inferred types.
            Built-in middleware
            Async actions without extra libraries
            Tiny buddle size
        Cons
            Less opinionated, No enforced structure.
            No Action serialization
                Zustand actions are functions
            No built-in selector memoization
            Persist hydration complexity
                When using persist middleware, you may need to handle hydration logic 
                to ensure the store initializes with persisted state correctly.
*/
