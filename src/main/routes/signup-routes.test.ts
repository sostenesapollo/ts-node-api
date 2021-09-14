import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
