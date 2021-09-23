import bcrypt from 'bcrypt'
import { Encrypter } from './../../data/protocols/cryptography/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return await new Promise(resolve => resolve(hash))
  }
}
