import 'dotenv/config';

import express from 'express';
import YAML from 'yamljs';
import * as path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'node:url';
import morgan from 'morgan';
import dbClient from './infra/database.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    await dbClient.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
})();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// API docs
const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
