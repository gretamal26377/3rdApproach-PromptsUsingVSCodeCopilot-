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
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
