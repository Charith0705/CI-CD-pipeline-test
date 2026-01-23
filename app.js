const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// API endpoint
app.get("/api/status", (req, res) => {
  res.json({
    application: "CI/CD Demo App",
    status: "Running",
    pipeline: "Successful",
    environment: "Docker + Jenkins",
    time: new Date().toLocaleString()
  });
});

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
