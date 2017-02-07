/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('raw-loader')
 * require('style-loader')
 * require('postcss-loader')
 * require('css-loader')
 * require('stylus')
 * require('stylus-loader')
 * require('less')
 * require('less-loader')
 * require('node-sass')
 * require('sass-loader')
 */
export declare function getWebpackStylesConfig(projectRoot: string, appConfig: any, target: string, sourcemap: boolean, outputHashing: string, extractCss: boolean): {
    entry: {
        [key: string]: string[];
    };
    module: {
        rules: any;
    };
    plugins: any[];
};
