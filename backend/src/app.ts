import cors from "cors";
import express from "express";

const app = express();
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    ok: true,
    message: "backend is running"
  });
});

app.listen(port, host, () => {
  console.log(`Backend listening on http://${host}:${port}`);
});

export default app;
