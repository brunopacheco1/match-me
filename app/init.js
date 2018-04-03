const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const ENV = process.env.NODE_ENV || "dev";
const ELASTIC_HOST = process.env.ELASTIC_HOST || "localhost:9200";

module.exports = () => {

    let app = express();

    const config = require(`./environments/${ENV}`);
    
    app.profile = config;
    app.profile.elastic.host = ELASTIC_HOST;
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(validator());

    consign({cwd: "app"})
        .include("model")
        .include("repositories")
        .include("services")
        .include("api")
        .into(app);

    return app;
}