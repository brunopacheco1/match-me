class ProfileService {
    constructor(app) {
        this._profileRepository = app.repositories.ProfileRepository(app);
    }

    async search(request) {
        return await this._profileRepository.search(request);
    }
}

module.exports = app => app => new ProfileService(app);