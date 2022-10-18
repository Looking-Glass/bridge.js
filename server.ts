import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import { encodeYuv420p, encodeYuv444p, playContent } from "./src/server/brigdeApis";
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  console.log("This is Express + TypeScript server");
  res.send('Express + TypeScript Server');
});

app.post('/play', async (req: Request, res: Response) => {
  if (!req.body) return res.status(400).send({ message: "Missing body parameters" })
  console.log(req.body)

  let response = await playContent(req.body)
  console.log('Response: ', response)

  res.send(response);
});

app.post('/encode-yuv420p', async (req: Request, res: Response) => {
  if (!req.body) return res.status(400).send({ message: "Missing body parameters" })
  console.log("/encode-yuv420p :", req.body)

  let response = await encodeYuv420p(req.body)
  console.log('Response: ', response)

  return res.send(response);

});

app.post('/encode-yuv444p', async (req: Request, res: Response) => {
  if (!req.body) return res.status(400).send({ message: "Missing body parameters" })
  console.log("/encode-yuv444p :", req.body)

  let response = await encodeYuv444p(req.body)
  console.log('Response: ', response)

  return res.send(response);

});

const port = process.env.PORT || 7456;
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`App is listening on http://localhost:${port}`);
});
