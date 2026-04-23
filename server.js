import express from "express";
import fetch from "node-fetch";

const app = express();

// ✅ support both formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/chat", async (req, res) => {
  try {
    const body = req.body.data ? JSON.parse(req.body.data) : req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("AI Proxy Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
