const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
describe('Login Testing', function () {
    it('should return successful login', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: 'reshma123@gmail.com',
                password: '12345678'
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

