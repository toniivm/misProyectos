import 'dotenv/config';
import { app } from './app.js';

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`VALTREX backend listening on http://0.0.0.0:${port}`);
});
