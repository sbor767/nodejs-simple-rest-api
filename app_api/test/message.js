//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let {deleteAll, createTestData} = require('./mysql')

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
})

/*
 * Test the /POST route
 */
describe('/POST message', () => {
  it('it should not POST a message without header field', (done) => {
    let message = {
      body: 'Test body'
    }
    chai.request(server)
      .post('/api/v1.0/messages')
      .set('content-type', 'application/json')
      .send(message)
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.a('array')
        // res.body.should.have.property('errors')
        // res.body.errors.should.have.property('header')
        res.body[0].should.have.property('param')
        res.body[0].should.have.property('param').eql('header')
        res.body[0].should.have.property('msg').eql('Header is required')
        // res.body.errors.pages.should.have.property('kind').eql('required')
        done()
      })
  })
})

let createdId = undefined

/*
 * Test2 the /POST route
 */
describe('/POST (2) message', () => {
  it('it should POST a normal message', (done) => {
    let message = {
      header: 'Test header',
      body: 'Test body'
    }
    chai.request(server)
      .post('/api/v1.0/messages')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(message)
      .end((err, res) => {
        res.should.have.status(201)
        createdId = res.body
        createdId.should.to.be.a('number')
        // res.body[0].should.have.property('param')
        // res.body[0].should.have.property('param').eql('header')
        // res.body[0].should.have.property('msg').eql('Header is required')
        // console.log(createdId)
        done()
      })
  })
})

/*
 * Test the /PUT route
 */
describe('/PUT message', () => {
  it('it should PUT as normal message', (done) => {
    let message = {
      header: 'Test header changed',
      body: 'Test body changed'
    }
    chai.request(server)
      // See issue https://github.com/chaijs/chai-http/issues/165
      .put(`/api/v1.0/messages/${createdId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(message)
      // .send({header: "Test header changed"})
      // .send({body: "Test body changed"})
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})


/*
 * Test the /GET(LIST) route
 */
describe('/GET (2) message', () => {
  it('it should GET a list of messages', (done) => {
    chai.request(server)
      .get('/api/v1.0/messages')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        console.log(res.body)
        res.body[0].should.have.property('header')
        res.body[0].should.have.property('header').eql('Test header changed')
        // console.log(createdId)
        done()
      })
  })
})

/*
 * Test the /DELETE route
 */
describe('/DELETE message', () => {
  it('it should DELETE a normal message', (done) => {
    chai.request(server)
      .delete(`/api/v1.0/messages/${createdId}`)
      .end((err, res) => {
        res.should.have.status(204)

        // @TODO Move this to post hook.
        createTestData(() => {})

        done()
      })
  })
})

// createTestData(() => {})
