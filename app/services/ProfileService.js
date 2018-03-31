class ProfileService {
    constructor(app) {
        this._profileRepository = app.repositories.ProfileRepository(app);
    }

    async get(id) {
        return await this._profileRepository.get(id);
    }

    async search(request) {
        return await this._profileRepository.search(request);
    }

    async list() {
        return await this._profileRepository.list();
    }
}

module.exports = app => app => new ProfileService(app);