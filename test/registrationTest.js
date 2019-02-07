const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
describe('Registartion Testing', function () {
    it('should return successful registration', (done) => {
        chai.request(server)
            .post('/registration')
            .send({
                firstName : 'reshma',
                lastName : 'patil',
                email: 'reshma@gmail.com',
                password: '12345678'
            })
            .end((err, res) => {
                res.should.have.status(200);
                console.log('registration testing successfull');    
                done();
            })
    })
})

