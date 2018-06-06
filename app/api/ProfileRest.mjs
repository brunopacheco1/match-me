import ProfileService from "../services/ProfileService"

export default function (app) {
  console.log("Loading rest api")
  const service = new ProfileService()

  app.post("/profile", async (request, response) => {  
    await service.save(request.body)
    response.sendStatus(200)
  })

  app.get("/profile/:id", async (request, response) => {  
    const r = await service.get(request.params.id)
    response.json(r)
  })
}