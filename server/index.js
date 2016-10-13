import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/user';
// import jsonParser from 'bodyParser';
var jsonParser = bodyParser.json();
import bcrypt from 'bcryptjs';
mongoose.Promise= global.Promise;

import usersRouter from './usersRouter';
import thoughtsRouter from './thoughtsRouter';


const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
exports.app = app;

app.use(express.static(process.env.CLIENT_PATH));
app.use(jsonParser);

app.use('/users', usersRouter);
app.use('/thoughts', thoughtsRouter);

function seedData() {
    //maybe only needed in dev mode?
    User.count({}).then(userCount => {
        if (userCount === 0) {
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash('password', salt, (err, hash) => {
                    for (let i = 0; i < 10; i++){
                        User.create({ username: 'user' + Math.floor(Math.random() * 10000), password: hash });
                    }
                    console.log("Created 10 users");
               });
            });
        }
    });
}

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/FeelsGood';
    mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');
            
            seedData();
            
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

if (require.main === module) {
    runServer();
}



