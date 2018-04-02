class ProfileRepository {

    constructor(app) {

        this._entityManager = app.repositories.EntityManager(app);
        this._indexName = this._entityManager.getIndexName();
        this._type = "profile";
    }

    async search(request) {

        const client = await this._entityManager.getClient();

        const body = await client.search({
            index: this._indexName,
            type: this._type
        });

        return body.hits.hits;
    }
}

module.exports = app => app => new ProfileRepository(app);