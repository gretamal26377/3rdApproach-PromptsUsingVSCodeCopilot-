module.exports = {
  plugins: {
    // tailwindcss: {},
    // Changed after persistent error, reading myself error description.
    // GitHub Copilot couldn't help me after several attempts.
    // However, GitHub Copilot told me now this is needed if you're using Tailwind CSS 4+
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
