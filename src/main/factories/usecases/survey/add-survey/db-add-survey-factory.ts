import { DbAddSurvey } from '@/data/usecases/survey/add-suvey/db-add-survey'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const accountMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(accountMongoRepository)
}
