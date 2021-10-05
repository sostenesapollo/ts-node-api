import { AccessDeniedError } from '../errors'
import { forbiden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbiden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
