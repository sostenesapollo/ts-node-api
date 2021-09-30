import app from '../config/app'
import request from 'supertest'
import { hash } from 'bcrypt'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      console.log('ok')
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('8102', 12)
      await accountCollection.insertOne({
        name: 'Sostenes',
        email: 'sostenesapollo25@gmail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'sostenesapollo25@gmail.com',
          password: '8102'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'sostenesapollo25@gmail.com',
          password: '8102'
        })
        .expect(401)
    })
  })
})
