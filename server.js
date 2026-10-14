// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Habilita CORS para que FCC pueda probar tu API
app.use(cors({ optionsSuccessStatus: 200 }));

// Archivos estáticos y página principal
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint principal: /api/:date?
app.get('/api{/:date}', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // Parámetro vacío: fecha actual
    parsedDate = new Date();
  } else if (/^-?\d+$/.test(date)) {
    // Solo dígitos: timestamp Unix en milisegundos
    parsedDate = new Date(Number(date));
  } else {
    // Cualquier otro formato que new Date() pueda interpretar
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

const PORT = process.env.PORT || 8000;
const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

export default app;
