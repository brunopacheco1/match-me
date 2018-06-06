import ProfileRepository from "../repositories/ProfileRepository"

export default class ProfileService {
  constructor() {
    this._profileRepository = new ProfileRepository()
  }

  async get(id) {
    return await this._profileRepository.get(id)
  }

  async save(profile) {
    await this._profileRepository.save(profile)
  }

  async update(profile) {
    await this._profileRepository.update(profile)
  }

  async delete(id) {
    await this._profileRepository.delete(id)
  }
}