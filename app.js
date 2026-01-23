const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>CI/CD Demo</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #e5e7eb;
            text-align: center;
            padding-top: 60px;
          }
          h1 { color: #38bdf8; }
          .box {
            background: #020617;
            padding: 20px;
            border-radius: 10px;
            width: 60%;
            margin: auto;
          }
        </style>
      </head>
      <body>
        <h1>🚀 CI/CD Pipeline Dashboard</h1>
        <div class="box">
          <p><b>Status:</b> Pipeline Running Successfully</p>
          <p><b>Environment:</b> Docker + Jenkins</p>
          <p><b>Port:</b> 3000</p>
          <p><b>Updated At:</b> ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
