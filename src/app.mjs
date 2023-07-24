import 'dotenv/config';

import express from 'express';
import YAML from 'yamljs';
import * as path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'node:url';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import formatDate from 'express-handlebars';
import stripTags from 'express-handlebars';
import truncate from 'express-handlebars';
import editIcon from 'express-handlebars';
import select from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import dashboard from './dashboard.mjs';
import login from './login.mjs';
import oauth2 from './oauth2.mjs';
import inventory from './inventory.mjs';
import dbClient from './infra/database.mjs';
import passportSetup from './config/passport.mjs';
import envs from './config/envs.mjs';
import store from './store.mjs';

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

passportSetup(passport);

app.use(
  session({
    secret: envs.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
  }),
);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(oauth2);
app.use(login);
app.use(dashboard);
app.use('/api/vi/store', store);
app.use('/api/v1/vehicle', inventory);

// API docs
const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
