const webpack = require("webpack");
const path = require("path");

var jFold = path.resolve(__dirname, "js");
var bFold = path.resolve(__dirname, "build");

var config = {
    entry:{
        "index":jFold+"/myjava.js",
        "room":jFold+"/room.js",
        "main":jFold+"/main.js",
        "prof":jFold+"/profile.js"
    },
    output: {
        filename:"[name]bundle.js",
        path: bFold
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })
    ]
};

module.exports = config; 