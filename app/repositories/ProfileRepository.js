class ProfileRepository {

    constructor(app) {

        this._entityManager = app.repositories.EntityManager(app);
        this._indexName = this._entityManager.getIndexName();
        this._type = "profile";
    }

    async get(id) {
        const client = await this._entityManager.getClient();

        const body = await client.search({
            index: this._indexName,
            type: this._type,
            q: `_id:${id}`
        });

        let profile = null;
        
        if(body.hits.total == 1) {
            profile = body.hits.hits[0];
        }

        return profile;
    }

    async list() {

        const client = await this._entityManager.getClient();

        const body = await client.search({
            index: this._indexName,
            type: this._type
        });

        return body.hits.hits;
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