import express from "express"
import bodyParser from "body-parser"
import Mongo from "mongoose"
import profileRest from "./api/ProfileRest"

export default () => {
  Mongo.connect("mongodb://localhost:27017/oto")
  const app = express()
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  profileRest(app)
  return app
}