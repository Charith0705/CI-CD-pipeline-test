const express = require("express");
const app = express();

// Serve frontend files
app.use(express.static("public"));

// Backend API
app.get("/api/status", (req, res) => {
  res.json({
    application: "CI/CD Demo App",
    status: "Running",
    pipeline: "Successful",
    environment: "Docker + Jenkins",
    time: new Date().toLocaleString()
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
