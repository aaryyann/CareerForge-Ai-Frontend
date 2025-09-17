
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Premium color palette
				emerald: {
					50: 'hsl(151, 81%, 96%)',
					100: 'hsl(149, 80%, 90%)',
					200: 'hsl(152, 76%, 80%)',
					300: 'hsl(156, 72%, 67%)',
					400: 'hsl(158, 64%, 52%)',
					500: 'hsl(160, 84%, 39%)',
					600: 'hsl(161, 94%, 30%)',
					700: 'hsl(163, 94%, 24%)',
					800: 'hsl(163, 88%, 20%)',
					900: 'hsl(164, 86%, 16%)',
					950: 'hsl(166, 91%, 9%)'
				},
				amber: {
					50: 'hsl(48, 100%, 96%)',
					100: 'hsl(48, 96%, 89%)',
					200: 'hsl(48, 97%, 77%)',
					300: 'hsl(46, 97%, 65%)',
					400: 'hsl(43, 96%, 56%)',
					500: 'hsl(38, 92%, 50%)',
					600: 'hsl(32, 95%, 44%)',
					700: 'hsl(26, 90%, 37%)',
					800: 'hsl(23, 83%, 31%)',
					900: 'hsl(22, 78%, 26%)',
					950: 'hsl(21, 84%, 15%)'
				},
				rose: {
					50: 'hsl(356, 100%, 97%)',
					100: 'hsl(355, 100%, 94%)',
					200: 'hsl(353, 96%, 90%)',
					300: 'hsl(353, 95%, 81%)',
					400: 'hsl(351, 95%, 71%)',
					500: 'hsl(350, 89%, 60%)',
					600: 'hsl(347, 77%, 50%)',
					700: 'hsl(345, 83%, 41%)',
					800: 'hsl(343, 80%, 35%)',
					900: 'hsl(341, 75%, 30%)',
					950: 'hsl(343, 87%, 16%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'glow': 'glow 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'hero-gradient': 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)',
				'card-gradient': 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)',
				'premium-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
