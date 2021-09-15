import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should LogControllerDecorator calls handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Name Test'
          }
        }
        return await new Promise(resolve => resolve(httpResponse))
      }
    }
    const contollerStub = new ControllerStub()
    const handleSpy = jest.spyOn(contollerStub, 'handle')
    const sut = new LogControllerDecorator(contollerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
    // const handleSpy = jest.spyOn(LogControllerDecorator.prototype, 'handle')
    // const controller = new LogControllerDecorator()
    // controller.handle()
    // expect(handleSpy).toHaveBeenCalled()
  })
})
