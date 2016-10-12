global.databaseUri = 'mongodb://localhost/FeelsGood';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var UrlPattern = require('url-pattern');
var app = require('../../server/index').app;

var User = require('../../server/usersRouter');

var makeSpy = require('./spy');

var should = chai.should();
var bcrypt=require('bcryptjs');
chai.use(chaiHttp);

describe('User endpoints', function() {
    var testUser,adminId;
    beforeEach(function(done) {
        // Clear the database
        testUser={
            username: 'validusername',
            password: 'validpassword'
        }
        mongoose.connection.db.dropDatabase(function(){
            bcrypt.genSalt(10,function(err, salt){
                bcrypt.hash('password',salt,function(err, hash){
                    User.create({
                        username:'admin',
                        password:hash
                    },function(err,user){
                        adminId=user._id.toString();
                        done();
                    })    
                })
            })
        });
        this.singlePattern = new UrlPattern('/users/:userId');
        this.listPattern = new UrlPattern('/users');
    });

    describe('/users', function() {
        describe('GET', function() {
            it('should return a single user', function() {
                // Get the list of users
                return chai.request(app)
                    .get(this.listPattern.stringify())
                    .auth('admin','password')
                    .then(function(res) {
                        // Check that it's an empty array
                        res.should.have.status(200);
                 
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('array');
                        res.body.length.should.equal(1);
                    });
            });
        });
        
    ///////**************//////POST////////////**********///////
        describe('POST', function() {
            it('should allow adding a user', function() {
                
                // Add a user
                return chai.request(app)
                    .post(this.listPattern.stringify())
                    .auth('admin','password')
                    .send(testUser)
                    .then(function(res) {
                        // Check that an empty object is returned
                        res.should.have.status(201);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.should.have.header('location');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;

                        var params = this.singlePattern.match(res.headers.location);
                        // Fetch the user from the database, using the
                        // location header to get the ID
                        return User.findById(params.userId).exec();
                    }.bind(this))
                    .then(function(res) {
                        // Check that the user exists in the database
                        should.exist(res);
                        res.should.have.property('username');
                        res.username.should.be.a('string');
                        res.username.should.equal(testUser.username);
                    });
            });
            it('should reject users without a username', function() {
                delete testUser.username;
                var spy = makeSpy();
                // Add a user without a username
                return chai.request(app)
                    .post(this.listPattern.stringify())
                    .send(testUser)
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Missing field: username');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });
            it('should reject non-string usernames', function() {
                testUser.username=78;
                var spy = makeSpy();
                // Add a user without a non-string username
                return chai.request(app)
                    .post(this.listPattern.stringify())
                    .send(testUser)
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Incorrect field type: username');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });
        });
    });
///////////************//GET USER ID//*****************////////////////
    describe('/users/:userId', function() {
        describe('GET', function() {
            it('should 404 on non-existent users', function() {
                var spy = makeSpy();
                // Request a non-existent user
                return chai.request(app)
                    .get(this.singlePattern.stringify({userId: '000000000000000000000000'}))
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(404);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('User not found');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });

            it('should return a single user', function() {
               
                var userId;
                // Add a user to the database
                return new User(testUser).save()
                    .then(function(res) {
                        userId = res._id.toString();
                        // Make a request for the user
                        return chai.request(app)
                            .get(this.singlePattern.stringify({
                                userId: adminId
                            }))
                            .auth('admin','password')
                    }.bind(this))
                    .then(function(res) {
                        // Check that the user's information is returned
                        
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('username');
                        res.body.username.should.be.a('string');
                        res.body.username.should.equal('admin');
                        res.body.should.have.property('_id');
                        res.body._id.should.be.a('string');
                        res.body._id.should.equal(adminId);
                    });
            });
        });
/////////****************///////////PUT////////*************////////
        describe('PUT', function() {
            it('should allow editing a user', function() {
                // var oldUser = {
                //     username: 'joe'
                // };
                var newUser = {
                    username: 'updated username',
                    password:'updated password'
                };
                var userId;
                    
                // Add a user to the database
                return new User(testUser).save()
                    .then(function(res) {
                         
                        userId = res._id.toString();
                        // Make a request to modify the user
                        return chai.request(app)
                            .put(this.singlePattern.stringify({
                                userId:adminId
                            }))
                            .auth('admin','password')
                            .send(newUser);
                    }.bind(this))
                    .then(function(res) {
                        // Check that an empty object was returned
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;
                       
                        // Fetch the user from the database
                        return User.findById(adminId).exec();
                    })
                    .then(function(res) {
                        // Check that the user has been updated
                        
                        console.log("res" + res);
                        should.exist(res);
                        res.should.have.property('username');
                        res.username.should.be.a('string');
                        res.username.should.equal(newUser.username);
                        res.should.have.property('password');
                        res.password.should.be.a('string');
                        chai.assert(bcrypt.compareSync(newUser.password,res.password));
                        // res.password.should.equal(hashedPassword);
                    });
            });
         
            it('should create a user if they don\'t exist', function() {
           
                // Request to add a new user
                return chai.request(app)
                    .put(this.singlePattern.stringify({
                        userId: adminId
                    }))
                    .send(testUser)
                    .auth('admin','password')
                    .then(function(res) {
                        // Check that an empty object was returned
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;

                        // Fetch the user from the database
                        return User.findById(adminId).exec();
                    })
                    .then(function(res) {
                        // Check that the user has been added
                        should.exist(res);
                        res.should.have.property('username');
                        res.username.should.be.a('string');
                        res.username.should.equal(testUser.username);
                    });
            });
            it('should reject users without a username', function() {
                delete testUser.username;
                var spy = makeSpy();
                // Add a user without a username
                return chai.request(app)
                    .put(this.singlePattern.stringify({
                        userId: adminId
                    }))
                    .send(testUser)
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Missing field: username or password');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });
            it('should reject non-string usernames', function() {
                testUser.username=42;
                var spy = makeSpy();
                // Add a user with a non-string username
                return chai.request(app)
                    .put(this.singlePattern.stringify({
                        userId: adminId
                    }))
                    .send(testUser)
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Incorrect field type: username');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });
            it('should reject non-string password', function() {
                testUser.password=42;
                var spy = makeSpy();
                // Add a user with a non-string username
                return chai.request(app)
                    .put(this.singlePattern.stringify({
                        userId: adminId
                    }))
                    .send(testUser)
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Incorrect field type: password');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });
        });
        ///////**********//////////DELETE////////////**********//

        describe('DELETE', function() {
            it('should 404 on non-existent users', function() {
                var spy = makeSpy();
                // Try to delete a non-existent user
                return chai.request(app)
                    .delete(this.singlePattern.stringify({
                        userId:"000000000000000"
                    }))
                    .auth('admin','password')
                    .then(spy)
                    .catch(function(err) {
                        // If the request fails, make sure it contains the
                        // error
                        var res = err.response;
                        res.should.have.status(404);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('User not found');
                    })
                    .then(function() {
                        // Check that the request didn't succeed
                        spy.called.should.be.false;
                    });
            });
            it('should delete a user', function() {
                
                var userId;
                // Create a user in the database
                return new User(testUser).save()
                    .then(function(res) {
                        userId = res._id.toString();
                        // Request to delete the user
                        return chai.request(app)
                            .delete(this.singlePattern.stringify({
                                userId: adminId
                            })).auth('admin','password')
                    }.bind(this))
                    .then(function(res) {
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;

                        // Try to fetch the user from the database
                        return User.findById(adminId);
                    })
                    .then(function(res) {
                        // Make sure that no user could be fetched
                        should.not.exist(res);
                    });
            });
        });
    });
});