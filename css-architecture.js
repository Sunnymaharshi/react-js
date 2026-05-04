/*
    CSS Architecture at Scale
        Problems 
            Global namespace collisions
            Specificity wars
            Dead code impossible to remove
            Side effects — changing one thing breaks another
            No encapsulation
            Bundle size bloat
        Every CSS architecture decision is fundamentally about 
        solving global namespace and encapsulation.
        The Cascade, Specificity, and Inheritance
            Specificity
                inline, IDs, classes/attrs/pseudos, elements - 1000, 100, 10, 1
                !important - nuclear option — breaks the cascade
        solution is a system that prevents high specificity from being needed.
        The Cascade Layers
            @layer
                allows us to create layers of CSS that cascade in a specific order.
                ex: @layer reset {
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                }
                Unlayered styles beat all layers — important for third-party overrides
                @layer is what Tailwind v4 uses internally and is the 
                modern answer to specificity management.
        BEM (Block Element Modifier)
            .card__header--dark
            BEM rules
                Never reference an element outside its block
                Never nest BEM classes in CSS
                    ex: .card .card__header — use .card__header alone
                Modifiers add to base
                    .card__header--dark should always apply both .card__header and .card__header--dark
        CSS Modules
            Solves global namespace at the build step
            generates unique class names per file.
            ex: Button.module.css
        CSS-in-JS
            generates unique class names per component.
            Runtime CSS-in-JS
                styled-components, Emotion
                How runtime CSS-in-JS works
                    1. Component renders
                    2. Library generates unique class name (hash of styles)
                    3. Injects <style> tag into <head> with that class
                    4. Applies class to element
                Problems
                    - Style injection happens at runtime
                    - Blocks rendering
                    - Increases JS bundle
                    - Hard to extract to static CSS
                    - Server/client mismatch in SSR
            Build-time CSS-in-JS
                Linaria, Vanilla Extract libraries
                How build-time CSS-in-JS works
                    1. Component is compiled
                    2. Library generates unique class name (hash of styles)
                    3. Extracts CSS to separate file at build time
                    4. Applies class to element
        Utility-First CSS (Tailwind)
            compose styles from utility classes rather than writing CSS.
        Design Tokens and Theming
            Design tokens are a way to store design decisions 
            (colors, spacing, typography) in a central place.
            They can be used to create themes and ensure consistency across a project.
        Performance
            Avoid expensive properties
                These force browser to recalculate entire layout - reflow
                ex: width, height, margin, padding, top, left, right, bottom
                Use transform and opacity for animations
            will-change
                hint to browser to promote to GPU layer
            content-visibility
                skip rendering offscreen content
            Critical CSS
                inline critical CSS, async load rest      
*/
