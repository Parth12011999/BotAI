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
  			}
  		},
  		animation: {
  			"toast-slide-in-right":
  				"toast-slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  			"toast-slide-in-bottom":
  				"toast-slide-in-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  			"toast-swipe-out": "toast-swipe-out 0.2s ease-out forwards",
  		},
  		keyframes: {
  			"toast-slide-in-right": {
  				"0%": { transform: "translateX(calc(100% + 1rem))" },
  				"100%": { transform: "translateX(0)" },
  			},
  			"toast-slide-in-bottom": {
  				"0%": { transform: "translateY(calc(100% + 1rem))" },
  				"100%": { transform: "translateY(0)" },
  			},
  			"toast-swipe-out": {
  				"0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  				"100%": {
  					transform: "translateX(calc(100% + 1rem))",
  				},
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
