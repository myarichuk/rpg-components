import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    globalObject: 'this',
  },
  //target: 'node',
  target: ['web', 'browserslist: > 1%, not dead'],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

export default config;
