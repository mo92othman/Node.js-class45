import Express from 'express';
import { json } from 'express';

const app = Express();
app.use(json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend');
});

app.post('/weather', (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send('City name is required.');
  } else {
    res.send(`${cityName} is the city.`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
