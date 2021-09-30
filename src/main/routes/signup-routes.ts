import { Router } from 'express'
import { adaptRoute } from '../../main/adapters/express-router-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignUpController()))
}
