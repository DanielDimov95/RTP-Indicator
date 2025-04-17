import fontFamily from './src/styles/tailwind/font-family';
import screens from './src/styles/tailwind/screens';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    fontFamily: fontFamily,
    screens: screens
  },
};
export const plugins = []; 