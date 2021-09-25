import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))
interface SutTypes {
  sut: Encrypter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')
  return {
    sut
  }
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.encrypt('any_value')
    expect(accessToken).toBe('any_token')
  })
})
