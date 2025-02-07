import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'assets/js/vendor-entry.js',
    output: {
        file: 'assets/js/vendor.bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        commonjs()
    ]
}; 