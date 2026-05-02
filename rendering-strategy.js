/*
    Rendering Strategy in React
        1. Client-Side Rendering (CSR)
        2. Server-Side Rendering (SSR)
        3. Static Site Generation (SSG)
        4. Incremental Static Regeneration (ISR)
        5. Partial Prerendering (PPR)
    Decision Tree for Choosing Rendering Strategy
        Is the content the same for all users?
            ├── Yes → Is it updated frequently?
            │         ├── No  → SSG (build-time HTML, CDN served)
            │         └── Yes → ISR (SSG + background revalidation)
            └── No  → Does it need to be indexed by search engines?
                    ├── Yes → SSR (per-request server render)
                    └── No  → Is real-time data critical?
                                ├── Yes → SSR + client fetch for live data
                                └── No  → CSR (dashboard, admin, behind auth)
    Every rendering decision is a tradeoff across these metrics
        TTFB    Time to First Byte       → how fast does the server respond?
        FCP     First Contentful Paint   → when does the user see something?
        LCP     Largest Contentful Paint → when is the main content visible?
        TTI     Time to Interactive      → when can the user interact?
        CLS     Cumulative Layout Shift  → does content jump around?
        TBT     Total Blocking Time      → how long is the main thread blocked?
        The gap between FCP and TTI is the "uncanny valley" —
        user sees content but nothing works yet.
    
    1. Client-Side Rendering (CSR)
        Browser receives an empty HTML shell and JavaScript bundle
        JavaScript executes, fetches data, and renders the UI on the client
        Used when 
            - Interactivity is more important than SEO
            - Fast initial load is not critical
        CSR Performance Optimization
            - Code splitting (React.lazy, Suspense)
            - Route based code splitting (React Router)
            - Lazy loading components and data
    2. Server-Side Rendering (SSR)
        Browser receives fully populated HTML
        Browser hydrates the HTML to make it interactive
            User SEES the button, but it doesn't WORK until hydration completes
            This is the "uncanny valley" of SSR
        Streaming SSR (React 18)
            server can send HTML in chunks as it's generated
            allows faster FCP and LCP, but TTI still depends on hydration
            happens over a single HTTP connection using chunked transfer encoding 
        Used when
            - SEO is important
            - Fast initial load is critical
        SSR Performance Optimization
            - Caching rendered HTML (CDN, server cache)
            - Selective hydration (only hydrate interactive parts)
            - Avoid blocking data fetching during render
    3. Static Site Generation (SSG)
        HTML is generated at build time (only once)
        Best for content that doesn't change often
        Best possible TTFB and FCP.
        TTI still depends on JS bundle size.
        Staleness Problem
            1. Rebuild on content change
            2. Incremental Static Regeneration (ISR)
            3. Client-side fetch for dynamic parts
            4. On-demand revalidation (webhook triggers rebuild)
    4. Incremental Static Regeneration (ISR)
        Hybrid approach: SSG + background revalidation
        Pages are generated at build time, but can be updated after deployment
        How it works
            1. User requests /blog/post-1
            2. CDN has stale version (expired 60s ago)
            3. CDN serves stale immediately → fast response
            4. CDN triggers background regeneration
            5. Next user gets fresh version
        This is stale-while-revalidate at the page level.
        Pros
            CDN-speed delivery
            Always available (stale fallback)
            Background updates — user never waits
            On-demand invalidation possible
        Cons
            Stale window — users may see outdated content
            First request after expiry triggers regeneration (cold start)
            Per-user content impossible (same HTML for everyone)
            Complex cache invalidation across CDN nodes
    
    5. Partial Prerendering (PPR)
        The Newest Pattern — Next.js 14+
        Combines SSG and SSR in a single request.
        Static shell served instantly, dynamic holes filled by streaming.
        How it works
            CDN serves prerendered static shell like SSG 
            FCP: user sees layout, navigation, skeleton
            Server computes dynamic content
            Streams dynamic holes into shell
            LCP: real content visible
    6. Edge Rendering
        Running server-side code at CDN edge nodes
        geographically close to users
    7. React Server Components (RSC)
        RSC doesn't send HTML or JSON — it sends a special serialized component tree
        key distinction is that Server Components never hydrate. 
        They run on the server on every navigation, return a serialized component tree rather than HTML
        SSR vs RSC 
            SSR (traditional):
                Server: renders React tree → HTML string
                Client: downloads JS → hydrates entire tree → React runs again
            RSC
                Server: renders Server Components → RSC payload
                Client: downloads JS for Client Components ONLY → partial hydration
                Server Components NEVER run on client — not even for hydration
                                SSR alone       RSC + SSR
            ─────────────────────────────────────────────
            Runs on server      Once            Always (SC)
            Runs on client      Always          Only Client Components
            JS bundle includes  Everything      Client Components only
            Can access DB       No (runtime)    Yes (Server Components)
            Re-renders on nav   Client-side     Server re-runs SC
        Page navigation with RSC:
            User clicks link → /blog/post-2
                    ↓
            Next.js router makes fetch to server
                    ↓
            Server re-runs Server Components with new params
                    ↓
            Server returns new RSC payload (not full HTML)
                    ↓
            Client merges new payload into existing React tree
                    ↓
            Client Components re-render with new props
            Client Component STATE IS PRESERVED where possible
        RSC Payload Format
            Server Components are serialized into a special format
            Client deserializes and merges into React tree
            This allows partial hydration and avoids sending JS for Server Components
            Pros
                Smaller JS bundles (no client code for Server Components)
                Faster TTI (less JS to parse and execute)
                Better data fetching (Server Components can fetch directly)
                Improved caching (Server Components can be cached at edge)
            Cons
                New mental model for developers
                Not all libraries are compatible with Server Components
                Debugging can be more complex due to server/client split
            RSC payload is a streaming JSON-like format
            Each line is a chunk that arrives over time
            Ex: 0:D{"name":"BlogPost","env":"Server"}
                1:I["/chunks/ClientComment.js",["default"],"Comment"]
                2:I["/chunks/ClientLike.js",["default"],"LikeButton"]
                3:["$","article",null,{
                    "children":[
                        ["$","h1",null,{"children":"My Post Title"}],
                        ["$","p",null,{"children":"Post content here..."}],
                        ["$","$1",null,{"postId":"123"}],    ← Client Component reference
                        ["$","$2",null,{"count":42}]         ← Client Component reference
                    ]
                }]
                $1, $2 are references to Client Components
                Their JS is loaded separately
                Server Component output is just data — no JS needed
                Client Components hydrate independently
        Server Actions
            RSC handles reads, Server Actions handle writes, without any API routes.
        Caching Architecture in Next.js RSC
            Four layers of caching:
            1. Request Memoization (per-render)
                Deduplicates fetch() calls within one render pass
                Automatically cleared after render
            2. Data Cache (persistent)
                fetch() results stored on server
                Persists across requests and deployments
                Invalidated by revalidatePath / revalidateTag
            3. Full Route Cache (build time)
                Entire RSC payload cached at build
                For static routes only
                Invalidated by revalidation
            4. Router Cache (client-side)
                RSC payloads cached in browser memory
                Enables instant back/forward navigation
                Expires after 30s (dynamic) or 5min (static)
*/
