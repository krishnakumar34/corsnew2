const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('CORS Proxy Running. Use /proxy?url=https://example.com');
});

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url=');

  req.pipe(request(targetUrl)).pipe(res);
});

app.listen(PORT, () => {
  console.log(`CORS proxy running on port ${PORT}`);
});
