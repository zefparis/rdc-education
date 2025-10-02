/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', "class"],
  theme: {
  	extend: {
  		backdropBlur: {
  			xs: '2px',
  			sm: '4px',
  			md: '8px',
  			lg: '12px',
  			xl: '16px',
  			'2xl': '20px',
  			'3xl': '24px'
  		},
  		boxShadow: {
  			'glass-sm': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			'glass-md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			'glass-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			'glass-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  			'glass-2xl': '0 32px 64px -12px rgba(0, 0, 0, 0.35)'
  		},
  		borderWidth: {
  			'1': '1px'
  		},
  		fontFamily: {
  			sans: [
  				'Geist Sans',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'Geist Mono',
  				'monospace'
  			]
  		},
  		colors: {
  			glass: {
  				primary: 'rgba(26, 26, 26, 0.8)',
  				secondary: 'rgba(38, 38, 38, 0.9)',
  				card: 'rgba(26, 26, 26, 0.7)',
  				modal: 'rgba(0, 0, 0, 0.9)'
  			},
  			'glass-border': 'rgba(255, 255, 255, 0.1)',
  			'glass-hover': 'rgba(255, 255, 255, 0.08)',
  			primary: {
  				blue: '#3b82f6',
  				'blue-hover': '#2563eb',
  				emerald: '#10b981',
  				'emerald-hover': '#059669',
  				purple: '#8b5cf6',
  				orange: '#f59e0b',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			background: 'hsl(var(--background))',
  			text: {
  				primary: '#ffffff',
  				secondary: '#f3f4f6',
  				muted: '#9ca3af'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
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
  			'glass-float': 'glass-float 3s ease-in-out infinite',
  			'glass-glow': 'glass-glow 2s ease-in-out infinite',
  			'glass-pulse': 'glass-pulse 2s ease-in-out infinite',
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'scale-in': 'scaleIn 0.2s ease-out'
  		},
  		keyframes: {
  			'glass-float': {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'glass-glow': {
  				'0%, 100%': {
  					boxShadow: 'var(--glass-shadow-md)'
  				},
  				'50%': {
  					boxShadow: 'var(--glass-shadow-lg), 0 0 20px rgba(59, 130, 246, 0.1)'
  				}
  			},
  			'glass-pulse': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.8'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			}
  		},
  		transitionDuration: {
  			'400': '400ms'
  		},
  		borderRadius: {
  			xl: '0.75rem',
  			'2xl': '1rem',
  			'3xl': '1.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
