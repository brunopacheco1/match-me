import Mongo from "mongoose"

const schema = new Mongo.Schema({
  _id: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  email: {
    type: String, required: true, trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  }
})

export default Mongo.model("profiles", schema)