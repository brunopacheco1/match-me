module.exports = {
    "settings" : {
        "number_of_shards" : 5
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