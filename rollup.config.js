import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const packageJson = require("./package.json");

export default [
  {
    input: "lib/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
      css(),
    ],
  },
  {
    input: "dist/cjs/types/lib/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
