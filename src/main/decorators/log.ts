import { Controller, HttpResponse } from '../../presentation/protocols'
// import { LogErrorRepository } from '../,,/data/protocols/db'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    return await new Promise(resolve => resolve({ body: 'ok', statusCode: 200 }))
  }
}
