import { HttpRequest, HttpResponse } from './load-surveys-controller-protocols'
import { Controller } from '../../../protocols/controller'
import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { ok } from '../../../middlewares/auth-middleware-protocols'
export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
