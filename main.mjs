import init from "./app/init";

const app = init()

app.listen(3000, () => {
  console.log("Server running.")
})