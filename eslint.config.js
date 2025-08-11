import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: [
      "js/ScrollTrigger.min.js",
      "js/flickity.pkgd.min.js",
      "js/gsap.min.js",
      "js/jquery-3.5.1.min.js",
      "js/swiper-bundle.min.js",
      "js/scrolldisable.js",
    ],
  },
  js.configs.recommended,
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jquery,
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
