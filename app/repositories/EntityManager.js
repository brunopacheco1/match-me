const ElasticSearch = require("elasticsearch");

class EntityManager {
    constructor(app) {

        this._indexName = app.profile.elastic.indexName;
        this._host = app.profile.elastic.host;
        this._port = app.profile.elastic.port;
        this._url = `${this._host}:${this._port}`;
        this._schema = app.model.Schema;
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

            const result = await client.indices.exists({index : this._indexName});

            if(!result) {
                await client.indices.create({
                    index : this._indexName,
                    body : this._schema
                });
            }

            return client;
        } catch(error) {
            console.log(error);
            
            throw {
                status : 400,
                message : "Elastic Search connection failed."
            };
        };
    }

    async checkSchema() {
        
    }

    getIndexName() {
        return this._indexName;
    }
}

module.exports = app => app => new EntityManager(app);