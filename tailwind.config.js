const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			shiki: {
    				light: 'var(--shiki-light)',
    				'light-bg': 'var(--shiki-light-bg)',
    				dark: 'var(--shiki-dark)',
    				'dark-bg': 'var(--shiki-dark-bg)'
    			}
    		},
    		animation: {
    			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
    			'toast-slide-in-right': 'toast-slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    			'toast-slide-in-bottom': 'toast-slide-in-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    			'toast-swipe-out': 'toast-swipe-out 0.2s ease-out forwards',
    			spotlight: 'spotlight 2s ease .75s 1 forwards',
    			'typing-dot-bounce': 'typing-dot-bounce 1.25s ease-out infinite'
    		},
    		keyframes: {
    			scroll: {
    				to: {
    					transform: 'translate(calc(-50% - 0.5rem))'
    				}
    			},
    			'toast-slide-in-right': {
    				'0%': {
    					transform: 'translateX(calc(100% + 1rem))'
    				},
    				'100%': {
    					transform: 'translateX(0)'
    				}
    			},
    			'toast-slide-in-bottom': {
    				'0%': {
    					transform: 'translateY(calc(100% + 1rem))'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			'toast-swipe-out': {
    				'0%': {
    					transform: 'translateX(var(--radix-toast-swipe-end-x))'
    				},
    				'100%': {
    					transform: 'translateX(calc(100% + 1rem))'
    				}
    			},
    			spotlight: {
    				'0%': {
    					opacity: 0,
    					transform: 'translate(-72%, -62%) scale(0.5)'
    				},
    				'100%': {
    					opacity: 1,
    					transform: 'translate(-50%,-40%) scale(1)'
    				}
    			},
    			'typing-dot-bounce': {
    				'0%,40%': {
    					transform: 'translateY(0)'
    				},
    				'20%': {
    					transform: 'translateY(-0.25rem)'
    				}
    			}
    		}
    	}
    },
	plugins: [
		addVariablesForColors,
		require("tailwindcss-animate"),
		require("tailwind-scrollbar")
	],
}

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}