import * as express from "express";

const app = express();
app.get("/api/", (req, res) => {
  res.send("Hello World!!")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})