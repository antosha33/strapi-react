/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			boxShadow:{
				default: '6px 2px 10px rgba(0, 0, 0, 0.25)',
			},
			colors: {
				'Content/Dark': '#000000',
				'Content/Middle': '#727070',
				'Content/Light': '#CAC8C8',
				'Content/Border': '#E3E3E3',
				'Dominant/Main': '#FFFFFF',
				'Dominant/Light': '#FAFAFA',
				'Dominant/Dop': '#F0F0F0',
				'Accent/Yellow': '#FFDC0A',
				'Accent/Dark_Yellow': '#CEB100',
				'Accent/Light_Yellow': '#FDF6E3',
				'Accent/Orange': '#F49424',
				'Accent/Red': '#E30613',
				'Accent/Red_Middle': '#F25050',
				'Accent/Rose': '#E8CCCC',
				'Accent/Blue': '#2F80ED',
				'Accent/Blue_Light': '#7BB2E7',
				'Accent/Green': '#07AF0E',
				'Accent/Light_Green': '#53CC58',
				'Accent/Lilac': '#D897E9',
			},
			fontSize: {
				'Regular(14_16)': ['1.4rem', '1.6rem'],
				'Regular(16_18)': ['1.6rem', '1.8rem'],
				'Regular(16_20)': ['16px', '20px'],
				'Regular(18_24)': ['18px', '24px'],
				'Regular(12_14)': ['1.2rem', '1.4rem'],
				'Regular(10_12)': ['10px', '12px'],
				'Regular(24_30)': ['24px', '30px'],
				'Regular(38_42)': ['38px', '42px'],
				'Regular(48_52)': ['4.8rem', '5.2rem'],
			}
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
}

