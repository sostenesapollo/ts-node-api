import { forbiden, ok, serverError } from '@/presentation/middlewares/auth-middleware-protocols'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, InvalidParamError, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbiden(new InvalidParamError('answer'))
        }
      } else {
        return forbiden(new InvalidParamError('surveyId'))
      }
      const surveyReult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })
      return ok(surveyReult)
    } catch (error) {
      return serverError(error)
    }
  }
}
