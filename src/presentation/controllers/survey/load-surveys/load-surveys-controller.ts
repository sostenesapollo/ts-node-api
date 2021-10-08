import { HttpRequest, HttpResponse } from './load-surveys-controller-protocols'
import { Controller } from '../../../protocols/controller'
import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { noContent, ok, serverError } from '../../../middlewares/auth-middleware-protocols'
export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
