var path = require('path');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	mode: 'development',
	devtool: 'inline-cheap-module-source-map',
	module: {
		rules: [
			{
				test: [/\.js$/,/\.jsx$/],
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ["@babel/plugin-proposal-class-properties"]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
				  { loader: "style-loader" },
				  { loader: "css-loader" }
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {}
				  }
				]
			}
		]
  },
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true,
		host: '127.0.0.1',
		port: '8080'
	}
}