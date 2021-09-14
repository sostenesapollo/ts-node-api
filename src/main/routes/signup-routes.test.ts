import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on succecss', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Sostenes',
        email: 'sostenesapollo25@gmail.com',
        password: '8102',
        passwordConfirmation: '8102'
      })
      .expect(200)
  })
})
