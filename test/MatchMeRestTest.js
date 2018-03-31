const app = require("../app/init")();
const request = require("supertest")(app);

describe("MatchMeRestTest", () => {

    let searchRequest = {
        "location": "-21.9448222,-44.1939177",
        "maxDistance" : 0,
        "minDistance" : 0
    };

    it("#POST /match-me/search not expected result by location", (done) => {
        searchRequest.location = "-21.9448222,0";

        request.post("/match-me/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });
    
    it("#POST /match-me/search not expected result by text", (done) => {
        searchRequest.lat = -21.9448222;
        searchRequest.query = "Teste";
        
        request.post("/match-me/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });

    it("#POST /match-me/search null location", (done) => {
        request.post("/match-me/search")
            .send({
                "maxDistance" : 0,
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/location is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /match-me/search null maxDistance", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/maxDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /match-me/search null minDistance", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/minDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /match-me/search invalid location", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "asdasdasd",
                "maxDistance" : "asdasdsa",
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/maxDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /match-me/search invalid maxDistance", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : "asdasdsa",
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/maxDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /match-me/search invalid minDistance", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 0,
                "minDistance" : "asdasdasd"
            })
            .expect("Content-Type", /json/)
            .expect(/minDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /match-me/search invalid query", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 1,
                "minDistance" : 0,
                "query" : "23"
            })
            .expect("Content-Type", /json/)
            .expect(/Query should be at least 3 chars long/)
            .expect(400, done);
    });

    it("#POST /match-me/search invalid limit", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 1,
                "minDistance" : 0,
                "limit" : "asd"
            })
            .expect("Content-Type", /json/)
            .expect(/limit should be int/)
            .expect(400, done);
    });

    it("#POST /match-me/search invalid start", (done) => {
        request.post("/match-me/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 1,
                "minDistance" : 0,
                "start" : "asd"
            })
            .expect("Content-Type", /json/)
            .expect(/start should be int/)
            .expect(400, done);
    });

    it("#POST /match-me/search empty result after deletion", (done) => {        
        request.post("/match-me/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });
});