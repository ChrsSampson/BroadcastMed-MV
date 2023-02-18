const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const dotenv = require('dotenv');

const app = require('../app');

dotenv.config({path: './.env.development.local'});

const seeder = require('../util/seeder');
const User = require('../models/User');
const Machine = require('../models/Machine');
const req = require('express/lib/request');

describe('User API', () => {
    let createdUserId = null

    let session = null;

    // setup and cleanup
    let ids = null

    before((done) => {
        seeder()
            .then((data) => {
                ids = data;
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    beforeEach((done) => {
        // login to get session with seed user
        request(app)
            .post('/api/auth/login')
            .send({
                username: 'admin',
                password: '1'
            })
            .expect('Content-Type', /json/)
            .expect(res => {
                session = res.body.data.session;
            })
            .end((err, res) => {
                if(err) throw err;
                done(err);
            });
    });

    // clean up after tests
    after((done) => {
        User.deleteMany({}, (err) => {
            if(err) throw err;
            done();
        });
        Machine.deleteMany({}, (err) => {
            if(err) throw err;
            done();
        })
    });

    it('Should fail to create a user with missing fields', (done) => {
        request(app)
            .post('/api/users')
            .set('Cookie', [`session=${session}`])
            .send({
                username: 'testyBoi'
            })
            .expect(res => {
                res.body.message === 'Missing Required Field (username, password)'
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    })

    it('Should be able to create a new User with required fields filled', (done) => {
        request(app)
            .post('/api/users')
            .set('Cookie', [`session=${session}`])
            .send({
                username: 'testyBoi',
                password: '1234'
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                res.status.message === 'Success'
                res.body.data.password !== '1234'
                createdUserId = res.body.data._id
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    });

    it('Should be able to get a list of all users', (done) => {
        request(app)
            .get('/api/users')
            .set('Cookie', [`session=${session}`])
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('error');
                expect(typeof(res.body.data)).to.be.equal('object');
                expect(res.body.data).to.have.property('length');
                expect(res.body.data.length).to.be.greaterThan(2);
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })

    it('Should be able to find a specific user by id', (done) => {
        request(app)
            .get(`/api/users/${ids.users[0]}`)
            .set('Cookie', [`session=${session}`])
            .expect(200)
            .expect(res => {
                res.body.data._id === ids.users[0]
                res.body.data.email === ids.users[0].email
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })

    it('Should be able to update a specific user by id', (done) => {
        request(app)
            .put(`/api/users/${createdUserId}`)
            .set('Cookie', [`session=${session}`])
            .send({
                username: 'SuperTestyBoi'
            })
            .expect(200)
            .expect(res => {
                res.body.data._id === createdUserId
                res.body.data.displayName === 'SuperTestyBoi'
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })


    it('Should be able find a delete a specific user by id', (done) => {
        request(app)
            .delete(`/api/users/${createdUserId}`)
            .set('Cookie', [`session=${session}`])
            .expect(200)
            .expect(res => {
                res.body.data._id === createdUserId
            })
            .end((err, res) => {
                if(err) throw err;
                done()
            });
    })

});

describe('Machine API', () => {
    let createdId = null;
    let currentName = null;

    let session = null;

    // setup and cleanup
    let ids = null

    before((done) => {
        seeder()
            .then((data) => {
                ids = data;
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    beforeEach((done) => {
        // login to get session with seed user
        request(app)
            .post('/api/auth/login')
            .send({
                username: 'admin',
                password: '1'
            })
            .expect('Content-Type', /json/)
            .expect(res => {
                session = res.body.data.session;
            })
            .end((err, res) => {
                if(err) throw err;
                done(err);
            });
    });

    // clean up after tests
    after((done) => {
        User.deleteMany({}, (err) => {
            if(err) throw err;
        });
        Machine.deleteMany({})
            .then(() => {
                done();
            })
    });

    it('should create a new machine', (done) => {
        request(app)
            .post('/api/machines')
            .set('Cookie', [`session=${session}`])
            .send({
                name: 'Test Machine',
                link: 'http://test.com'
            })
            .expect(201)
            .expect((res) => {
                res.body.data.name === 'Test Machine';
                res.body.data.link === 'http://test.com';
                createdId = res.body.data._id;
                currentName = res.body.data.name;
            })
            .end((err) => {
                if(err) throw err;
                done()
            })
    });

    it('Should fail to create machine without name', (done) => {
        request(app)
            .post('/api/machines')
            .set('Cookie', [`session=${session}`])
            .send({
                link: 'http://test.com'
            })
            .expect((res) => {
                expect(res.body.message).to.equal('Error: Missing required fields (name, link)');
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Should fail to create machine without link', (done) => {
        request(app)
            .post('/api/machines')
            .set('Cookie', [`session=${session}`])
            .send({
                name: 'Test Machine'
            })
            .expect((res) => {
                expect(res.body.message).to.equal('Error: Missing required fields (name, link)');
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })

    it('should return a list of all machines', (done) => {
        request(app)
            .get('/api/machines')
            .set('Cookie', [`session=${session}`])
            .expect((res) => {
                expect(res.body.data).to.be.an('array');
                expect(res.body.data).to.have.lengthOf(5);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })

    it('should be able to lookup a single machine', (done) => {
        request(app)
            .get(`/api/machines/${createdId}`)
            .set('Cookie', [`session=${session}`])
            .expect((res) => {
                expect(res.body.data.name).to.equal(currentName);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Should update a Machine and return the updated machine', (done) => {
        request(app)
            .put(`/api/machines/${createdId}`)
            .set('Cookie', [`session=${session}`])
            .send({
                name: 'Updated Machine',
                link: 'http://updated.com',
                tag: 'Desktop Encoder'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data._id).to.equal(createdId);
                expect(res.body.data.name).to.equal('Updated Machine');
                expect(res.body.data.link).to.equal('http://updated.com');
                expect(res.body.data.tag).to.equal('Desktop Encoder');
                currentName = res.body.data.name;
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Should delete a Machine and return the deleted machine', (done) => {
        request(app)
            .delete(`/api/machines/${createdId}`)
            .set('Cookie', [`session=${session}`])
            .expect(200)
            .expect((res) => {
                expect(res.body.data._id).to.equal(createdId);
                expect(res.body.data.name).to.equal(currentName);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });
});

describe('Auth API', () => {
    let createdUserId = null
    let session = null

    before((done) => {
        seeder()
            .then((data) => {
                ids = data;
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    before((done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                username: 'admin',
                password: '1'
            })
            .expect(res => {
                session = res.body.data.session;
            })
            .end((err, res) => {
                if(err) throw err;
                done(err);
            });
    });

    after((done) => {
        User.deleteMany({}, (err) => {
            if(err) throw err;
        });
        Machine.deleteMany({})
            .then(() => {
                done();
            })
    });

    it('Should be able to create a user', async () => {
        request(app)
            .post('/api/users')
            .set('Cookie', [`session=${session}`])
            .send({
                username: 'AuthBoi',
                password: '1234'
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                console.log(res.body)
                res.status.message === 'Success'
                res.body.data.password !== '1234'
                createdUserId = res.body.data._id
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    });

    it('Should be able to login a user', async () => {
        request(app)
            .post('/api/auth/login')
            .set('Cookie', [`session=${session}`])
            .send({
                username: 'AuthBoi',
                password: '1234'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                console.log(res.body)
                res.status.message === 'Login Successful'
                res.body.data._id === createdUserId

            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    });

});
