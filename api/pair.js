// Vercel Serverless Function — pwoksi ki rele backend Pterodactyl la
// Navigatè a (HTTPS sou Vercel) pa ka rele http://209.38.42.10:19197
// dirèkteman (mixed content bloke sa). Kidonk requête a pase la a:
// Browser (HTTPS) -> Vercel function (server-side, pa gen restriksyon) -> Pterodactyl (HTTP)

const BACKEND_URL = 'http://209.38.42.10:19197/api/pair';

module.exports = async (req, res) => {
  // CORS de baz, itil si w teste soti yon lòt domèn
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const phone = req.body?.phone;

    const backendRes = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (err) {
    console.error('❌ Vercel proxy error:', err.message);
    res.status(502).json({ error: 'Pa kapab jwenn sèvè bot la kounye a. Verifye li ap kouri.' });
  }
};
