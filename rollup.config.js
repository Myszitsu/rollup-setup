import path from 'path'
import svelte from 'rollup-plugin-svelte'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import commonjs from '@rollup/plugin-commonjs'
import preprocess from 'svelte-preprocess'
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel'

const production = !process.env.ROLLUP_WATCH

function serve() {
	let isRunning = false
	return {
		writeBundle() {
			if (!isRunning) {
				require('child_process').spawn(
					'npm.cmd',
					['run', 'start', '--', '--dev'],
					{
						stdio: ['ignore', 'inherit', 'inherit'],
					}
				)
				isRunning = true
			}
		},
	}
}

export default {
	input: path.resolve(__dirname, './src/main.js'),
	output: {
		name: 'app',
		sourcemap: true,
		format: 'iife',
		file: path.resolve(__dirname, './public/build/bundle.js'),
	},
	watch: {
		clearScreen: false,
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production,
			},
			//enable for using scss in .svelte files
			preprocess: preprocess(),
			// enable to ship css content in js files compiled by svelte
			// emitCss: false
		}),
		postcss({
			extract: true,
		}),
		nodeResolve({
			browser: true, // respect the "browser" settings in package.json
			dedupe: ['svelte'], // don't duplicate svelte from node_modules if it's imported in multiple files
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled',
			extensions: ['.js', '.mjs', '.html', '.svelte'],
			presets: ['@babel/preset-env']
		}),
		!production && livereload(path.resolve(__dirname, './public')),
		!production && serve(),
	],
}

// Warning: do not change code in this file while running "rollup -c -w", it will deprecate serve to other port, no fix found

