var path = require('path');

module.exports = {
	entry : "./assets/app.js", 
	output : {
		path: __dirname + "/dist",
		publicPath: "/app/dist/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader' },
			{test: /\.less$/, loader: "style!css!less"}
 		]
	}
}