import config from 'config'
import crypto from 'crypto'


export const generateHash = string => {
  const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64')

  if (string) {
    const hash = crypto.pbkdf2Sync(string, salt, 12000, config.crypto.hash.length, 'sha256').toString('base64')
    return {
      salt,
      hash
    }
  }
  return null
}

export const compareHashes = (income, hash, salt) => {
  const hashResult = crypto.pbkdf2Sync(income, salt, 12000, config.crypto.hash.length, 'sha256').toString('base64')
  return hash === hashResult
}

export const generateSid = () => crypto.randomBytes(config.crypto.hash.length).toString('base64')
