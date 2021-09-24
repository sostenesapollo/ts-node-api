import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adpter'

jest.mock('bcrypt', () => ({
  async hash () {
    return await new Promise(resolve => resolve('hash'))
  },
  async compare () {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error()
    })

    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call comparer with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
})
