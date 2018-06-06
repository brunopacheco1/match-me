import profile from "../model/profile.model"
import EntityManager from "./EntityManager"

export default class ProfileRepository {

  constructor() {
    this._entityManager = new EntityManager(profile)
  }

  async save(profiles) {
    await this._entityManager.save(profiles)
  }

  async update(profiles) {
    await this._entityManager.update(profiles)
  }

  async delete(ids) {
    await this._entityManager.delete(ids)
  }

  async get(id) {
    return await this._entityManager.get(id)
  }
}