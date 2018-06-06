export default class EntityManager {
  
  constructor(model) {
    this._model = model
  }

  async save(entities) {
    const operation = entity => { return {insertOne: {document: entity}} }
    await this._bulk(entities, operation)
  }

  async update(entities) {
    const operation = entity => { return {updateOne: {filter: {_id : entity._id}, update: {$set : entity}}} }
    await this._bulk(entities, operation)
  }

  async delete(ids) {
    const operation = id => { return {deleteOne : { filter: {_id: id}}} }
    await this._bulk(ids, operation)
  }

  async get(id) {
    return await this._model.findById(id)
  }

  async find(search) {
    return await this._model.find(search.mongoQuery).skip(search.start).limit(search.limit)
  }

  async exists(id) {
    const c = await this._model.count({_id: id})
    return c > 0
  }

  async _bulk(entities, operation) {
    const varargs = [].concat(entities || []);
    const operations = varargs.reduce((array, entity) => array.concat(operation(entity)), [])
    await this._runBulkOperations(operations)
  }

  async _runBulkOperations(operations) {
    try {
      await this._model.bulkWrite(operations)
    } catch(error) {
      this._buildAndThrowErrorFromBulkResponse(error)
    }
  }

  _buildAndThrowErrorFromBulkResponse(error) {
    const msgs = error.result.getWriteErrors()
      .map(error => error.errmsg).filter(msg => !msg.includes("E11000"))
    if(msgs.length > 0)
      throw { statusCode: 400, message: msgs }
  }
}