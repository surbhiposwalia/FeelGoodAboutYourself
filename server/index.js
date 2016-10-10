import 'babel-polyfill';
import express from 'express';
var mongoose = require('mongoose');

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));

//mongoose.Promise = global.Promise; //why does this make it work?

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/FeelsGood';
    mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');
            var port = process.env.PORT || 8080;
            var server = app.listen(port, function() {
                console.log('Listening on localhost:' + port);
                if (callback) {
                    callback(server);
                    console.log('server running');
                }
            })
        .catch(function(err){
            console.log(err); 
        });
    });
};

// function runServer() {
//     return new Promise((resolve, reject) => {
//         app.listen(PORT, HOST, (err) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             }

//             const host = HOST || 'localhost';
//             console.log(`Listening on ${host}:${PORT}`);
//         });
//     });
// }

if (require.main === module) {
    runServer();
}
