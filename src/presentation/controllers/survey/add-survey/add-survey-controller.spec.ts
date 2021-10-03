import { Validation } from './../../../protocols/validation'
import { HttpRequest } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

class ValidationStub implements Validation {
  validate (input: any): Error {
    return null
  }
}

describe('AddSurvey Controller', () => {
  test('Should call validation with correct params', async () => {
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
