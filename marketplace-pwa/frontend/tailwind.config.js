/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./admin/src/**/*.{js,jsx,ts,tsx}",
    "./customer/src/**/*.{js,jsx,ts,tsx}",
    "./shared-lib/src/**/*.{js,jsx,ts,tsx}",
    "./shared-lib/src/**/*.mdx",
  ],
  theme: {
    extend: {
      // As we use extend here, we are not overriding the default Tailwind CSS styles
      // You can add/extend custom tokens for: colors, spacing, etc. here if needed
      // Example:
      // colors: {
      //   primary: '#2563eb',
      // },

      // fontFamily.sans array typically includes a font sequence: first ones are preferred, and the rest are fallbacks in case earliers aren't available on user's system
      fontFamily: {
        // /* ...fallbacks */ purpose  is to indicate that after "system-ui", it might be added additional fallback fonts to the array
        sans: ["Inter", "ui-sans-serif", "system-ui" /* ...fallbacks */],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
