//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let { deleteAll } = require('./mysql')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Messages', () => {
  beforeEach((done) => { //Before each test we empty the database
    deleteAll(done)
  })
  /*
    * Test the /GET route
    */
  describe('/GET message', () => {
    it('it should GET all the messages', (done) => {
      chai.request(server)
        .get('/api/v1.0/messages')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  /*
  * Test the /POST route
  */
  describe('/POST message', () => {
    it('it should not POST a message without header field', (done) => {
      let message = {
        body: "Test body"
      }
      chai.request(server)
        .post('/api/v1.0/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(422);
          // res.body.should.be.a('object');
          // res.body.should.be.a('array');
          // res.body.should.have.property('errors');
          // res.body.errors.should.have.property('header');
          res.body[0].should.have.property('param');
          res.body[0].should.have.property('param').eql('header');
          res.body[0].should.have.property('msg').eql('Header is required');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });

  })


})
