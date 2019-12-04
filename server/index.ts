import * as express from "express";
import {Config} from './config';

const app = express();
app.get("/api/", (req, res) => {
  res.send("Hello World!!!!")
})
app.listen(Config.Port, () => {
  console.log(`Server is running in http://localhost:${Config.Port}`)
})