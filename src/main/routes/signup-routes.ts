import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adaptRoute } from '../../main/adapters/express-router-adapter'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignUpController()))
}