import init from "../app/init"
import supertest from "supertest"
import Mocha from "mocha"
const describe = Mocha.describe
const it = Mocha.it

const request = supertest(init())

console.log("Testing.")
describe("Testes na API de Crawling", () => {

  it("GET /profile/ddddd", (done) => {
    request.get("/profile/ddddd")
      .expect("Content-Type", /json/)
      .expect(/null/)
      .expect(200, done)
  })
})