const ElasticSearch = require("elasticsearch");

class EntityManager {
    constructor(app) {

        this._indexName = app.profile.elastic.indexName;
        this._host = app.profile.elastic.host;
        this._port = app.profile.elastic.port;
        this._url = `${this._host}:${this._port}`;
    }

    async getClient() {
        try {
            const client = new ElasticSearch.Client({
                host : this._url
                //log : "trace"
            });

            await client.ping({
                requestTimeout: 1000
            });

            return client;
        } catch(error) {
            console.log(error);
            
            throw {
                status : 400,
                message : "Elastic Search connection failed."
            };
        };
    }

    getIndexName() {
        return this._indexName;
    }
}

module.exports = app => app => new EntityManager(app);