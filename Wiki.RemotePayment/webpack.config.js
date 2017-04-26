'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const getTimePrefix = function(){
	const d = new Date();
	const curr_date = d.getDate();
	const curr_month = d.getMonth() + 1;
	const curr_year = d.getFullYear();
	const curr_time = d.getMinutes();
	return '' + curr_year+curr_month+curr_date+curr_time;
}
const plugins = [
        new webpack.DefinePlugin({
            NODE_ENV : JSON.stringify(NODE_ENV)
        }),
        new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery"
	    })
    ]

    if (NODE_ENV !== 'development') {
    	plugins.push(
    	new webpack.optimize.UglifyJsPlugin({
	   	compress : {warnings:false}
	   }));  	
    }
module.exports = {
	entry : {
		managers: "./dist/js/app/managers/app.ts",
		payments: "./dist/js/app/payments/app.ts",
		sms: "./dist/js/app/sms/app.ts"
	},
	output : {
		path: "dist/public",
	    filename: NODE_ENV === 'development' ? `[name].entry.js` : `[name].entry_${getTimePrefix()}.min.js`
	},
	watch: NODE_ENV === 'development',
    watchOptions : {
        aggregateTimeout : 100
    },
    devtool: "cheap-inline-module-source-map",
    plugins,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'] 
    },
    module: {
        loaders: [
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]  
    }
}