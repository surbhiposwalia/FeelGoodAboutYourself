import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/user';
import Thought from './models/thought';
import bcrypt from 'bcryptjs';
import usersRouter from './usersRouter';
import thoughtsRouter from './thoughtsRouter';

mongoose.Promise= global.Promise;
const jsonParser = bodyParser.json();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
const app = express();
exports.app = app;

app.use(express.static(process.env.CLIENT_PATH));
app.use(jsonParser);
app.use('/users', usersRouter);
app.use('/thoughts', thoughtsRouter);

function seedData() {
    User.count({}).then(userCount => {
        if (userCount === 0) {
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash('password', salt, (err, hash) => {
                    User.create({ username: 'user1', password: hash })
                    .then(function(user){
                        Thought.create({thought: 'Welcome!', from: user._id, stars: 5})
                        .then(function(){
                            console.log("Created 1 user and 1 thought");
                        })
                        .catch(console.error);
                    })
                    .catch(console.error);
               });
            });
        }
    });
}

const runServer = function(callback) {
    const databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/FeelsGood6';
    mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');
            seedData();
            const port = process.env.PORT || 8080;
            const server = app.listen(port, function() {
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



