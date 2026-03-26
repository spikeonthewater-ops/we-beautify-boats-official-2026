import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect spikeonthewater.ca to webeautifyboats.com — preserve full path + query
app.use((req, res, next) => {
  const host = req.hostname ?? "";
  if (host.includes("spikeonthewater.ca")) {
    const destination = `https://www.webeautifyboats.com${req.originalUrl}`;
    return res.redirect(301, destination);
  }
  next();
});

// QR code redirects — printed materials
app.get("/scheduleservices", (_req, res) => res.redirect(301, "/our-services"));
app.get("/booking-calendar/bottom-prep-level-4-bp04", (_req, res) => res.redirect(301, "https://spikeonthewater.ca/blog/bottom-prep-level-4"));
app.get("/service-page/full-boat-detailing-assessment-byspike-book-spike-now", (_req, res) => res.redirect(301, "/"));

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  const staticDir = path.join(process.cwd(), "artifacts/we-beautify-boats/dist/public");
  if (fs.existsSync(staticDir)) {
    app.use(express.static(staticDir));
    app.use((_req, res) => {
      res.sendFile(path.join(staticDir, "index.html"));
    });
  }
}

export default app;
