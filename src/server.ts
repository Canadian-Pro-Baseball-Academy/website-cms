import express from "express";
import payload from "payload";

import { generateTeams } from "./utils/teamsnap/generate-teams";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL Test: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  app.get("/generate-teams", async (req, res) => {
    await generateTeams(payload);
    res.send("Generating Teams");
  });

  app.listen(process.env.PORT || 8000);
};

start();
