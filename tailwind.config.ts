
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
		fontFamily: {
			sans: ['"Raleway"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			heading: ['"Poppins"', '"Raleway"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
				// CareerForge color palette
				blue: {
					50: 'hsl(214, 100%, 97%)',
					100: 'hsl(214, 95%, 93%)',
					200: 'hsl(213, 97%, 87%)',
					300: 'hsl(212, 96%, 78%)',
					400: 'hsl(213, 94%, 68%)',
					500: 'hsl(217, 91%, 60%)',
					600: 'hsl(221, 83%, 53%)',
					700: 'hsl(221, 64%, 33%)',
					800: 'hsl(222, 57%, 28%)',
					900: 'hsl(222, 47%, 11%)',
					950: 'hsl(224, 71%, 4%)'
				},
				indigo: {
					50: 'hsl(226, 100%, 97%)',
					100: 'hsl(226, 100%, 94%)',
					200: 'hsl(228, 96%, 89%)',
					300: 'hsl(230, 94%, 82%)',
					400: 'hsl(234, 89%, 74%)',
					500: 'hsl(239, 84%, 67%)',
					600: 'hsl(245, 58%, 51%)',
					700: 'hsl(243, 55%, 43%)',
					800: 'hsl(244, 47%, 35%)',
					900: 'hsl(242, 47%, 28%)',
					950: 'hsl(244, 55%, 17%)'
				},
				violet: {
					50: 'hsl(250, 100%, 98%)',
					100: 'hsl(251, 91%, 95%)',
					200: 'hsl(251, 95%, 92%)',
					300: 'hsl(252, 95%, 85%)',
					400: 'hsl(255, 92%, 76%)',
					500: 'hsl(258, 90%, 66%)',
					600: 'hsl(263, 83%, 58%)',
					700: 'hsl(263, 70%, 50%)',
					800: 'hsl(263, 69%, 42%)',
					900: 'hsl(264, 67%, 35%)',
					950: 'hsl(261, 73%, 23%)'
				},
				cyan: {
					50: 'hsl(183, 100%, 96%)',
					100: 'hsl(185, 96%, 90%)',
					200: 'hsl(186, 94%, 82%)',
					300: 'hsl(187, 92%, 69%)',
					400: 'hsl(188, 86%, 53%)',
					500: 'hsl(188, 95%, 43%)',
					600: 'hsl(192, 91%, 36%)',
					700: 'hsl(193, 82%, 31%)',
					800: 'hsl(194, 70%, 27%)',
					900: 'hsl(196, 64%, 24%)',
					950: 'hsl(197, 79%, 15%)'
				},
				green: {
					50: 'hsl(138, 76%, 97%)',
					100: 'hsl(141, 84%, 93%)',
					200: 'hsl(141, 79%, 85%)',
					300: 'hsl(142, 77%, 73%)',
					400: 'hsl(142, 69%, 58%)',
					500: 'hsl(142, 76%, 36%)',
					600: 'hsl(142, 72%, 29%)',
					700: 'hsl(143, 64%, 24%)',
					800: 'hsl(144, 61%, 20%)',
					900: 'hsl(145, 63%, 16%)',
					950: 'hsl(146, 80%, 10%)'
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
