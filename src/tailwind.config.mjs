/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '300' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '300' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '300' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '300' }],
                xl: ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '400' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '400' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '500' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
                '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '0.06em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.06em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.07em', fontWeight: '800' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.07em', fontWeight: '800' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "playfair display",
                paragraph: "lato-light"
            },
            colors: {
                'soft-gold-accent': '#DAA520',
                destructive: '#FF0000',
                'destructive-foreground': '#FFFFFF',
                'starry-night': '#1A1A2E',
                'starry-night-foreground': '#FFFFFF',
                'soft-glow': '#FFFACD',
                background: '#FDF5E6',
                secondary: '#D8BFD8',
                foreground: '#4A4A4A',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#E6A9B8'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
