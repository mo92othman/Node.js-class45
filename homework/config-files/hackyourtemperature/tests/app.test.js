import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);
describe('GET /', () => {
  const request = supertest(app);

  it('should return a specific message', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello from backend to frontend');
  });
});

describe('POST /weather', () => {
  const request = supertest(app);

  it('should return an error if cityName is missing in the request', async () => {
    const res = await request.post('/weather').send({});
    expect(res.status).toBe(400);
  });

  it('should return city weather information if valid cityName is provided', async () => {
    const res = await request.post('/weather').send({ cityName: 'Amsterdam' });
    expect(res.status).toBe(200);
  });

  it('should return an error if an invalid cityName is provided', async () => {
    const res = await request.post('/weather').send({ cityName: 'Amsterdab' });
    expect(res.status).toBe(404);
    expect(res.text).toBe('City not found');
  });
});
