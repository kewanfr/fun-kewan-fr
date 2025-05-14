/** @type {import('postcss').Config} */
// module.exports = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//     autoprefixer: {},
//   },
// };

export default {
  plugins: {
    "postcss-import": {},
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    // autoprefixer: {
    //   ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    // },
  },
};