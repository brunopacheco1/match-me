module.exports = {
    "settings" : {
        "number_of_shards" : 1,
        "number_of_replicas" : 0
    },
    "mappings" : {
        "profile" : {
            "properties" : {
                "location" : { "type" : "geo_point" },
                "username" : { "type" : "text" },
                "name" : { "type" : "text" }
            }
        }
    }
};