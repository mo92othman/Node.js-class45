import Express from 'express';
import { json } from 'express';
import keys from './sources/keys.js';

const app = Express();
app.use(json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend');
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send('City name is required.');
  } else {
    try {
      const apiKey = keys.API_KEY;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        // Extract necessary data and send it as a response
        const temperature = data.main.temp;
        res.status(200).json({ cityName, temperature });
      } else {
        res.status(404).send('City not found');
      }
    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
