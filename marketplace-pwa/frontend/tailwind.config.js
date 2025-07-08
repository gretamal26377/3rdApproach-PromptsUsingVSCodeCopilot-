/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./admin/src/**/*.{js,jsx,ts,tsx}",
    "./customer/src/**/*.{js,jsx,ts,tsx}",
    "./shared-lib/src/**/*.{js,jsx,ts,tsx}",
    "./shared-lib/src/**/*.mdx",
  ],
  safelist: [
    /**
    {
      pattern:
        // Issue: For some unknown reason, this regex doesn't work
        /bg-(red|blue|green|yellow|gray|indigo|purple|pink)-(50|100|200|300|400|500|600|700|800|900)/,
      // /bg-[a-z]+-\d{2,3}/,
    },
    */
    "bg-red-50",
    "bg-red-100",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
  ],
  theme: {
    extend: {
      // As we use extend here, we are not overriding the default Tailwind CSS styles
      // You can add/extend custom tokens for: colors, spacing, etc. here if needed
      // Example:
      // colors: {
      //   primary: '#2563eb',
      // },

      // fontFamily.sans array typically includes a font sequence: first ones are preferred, and the rest are fallbacks in case earlier aren't available on user's system
      fontFamily: {
        // /* ...fallbacks */ purpose  is to indicate that after "system-ui", it might be added additional fallback fonts to the array
        sans: ["Inter", "ui-sans-serif", "system-ui" /* ...fallbacks */],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
