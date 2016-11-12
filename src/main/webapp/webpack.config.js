var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry : "./assets/app.js", 
	output : {
		path: __dirname + "/dist",
		publicPath: "../dist/",
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader' },
			{test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
			{test: /\.less$/, loader: "style!css!less"},
			{ test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
 		]
	},
	plugins: [
    new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery",
	    "window.jQuery": "jquery"
    })
  ]
}