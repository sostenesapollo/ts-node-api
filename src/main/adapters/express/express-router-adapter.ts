import { HttpRequest } from '../../../presentation/protocols/http'
import { Request, Response } from 'express'
import { Controller } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const HttpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(HttpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
