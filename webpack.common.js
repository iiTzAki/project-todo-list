 import path from 'node:path';
 import { fileURLToPath } from 'node:url';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 export default {
   entry: {
     app: './src/js/index.js',
   },
   experiments: {
     html: true,
   },
   output: {
     filename: '[name].bundle.js',
     htmlFilename: 'index.html',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
     html: {
       meta: {
         charset: 'UTF-8',
         viewport: 'width=device-width, initial-scale=1',
       },
       title: 'Production',
     },
   },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: "./src/template.html", 
        }), 
    ], 
    module: { 
        rules: [ 
            {
                test: /\.css$/i, 
                use: ["style-loader", "css-loader"], 
            },
            { 
                test: /\.html$/i, 
                use: ["html-loader"], 
            }, 
            { 
                test: /\.(woff|woff2|eot|ttf|otf)$/i, 
                type: 'asset/resource', 
            }
        ],
    },
 };