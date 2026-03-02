import mwalajs from 'mwalajs';
import session from 'express-session';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';

import authRoutes from './routes/authRoutes.mjs';
import foodRoutes from './routes/foodRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs';

dotenv.config();


import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use mwalajs directly (it's an instance now)
mwalajs.set('view engine', 'ejs');
mwalajs.set('views', path.join(__dirname, 'views'));
// Serve static files correctly
mwalajs.useStatic(path.join(__dirname, 'public'));


mwalajs.use(mwalajs.urlencoded({ extended: true }));
mwalajs.use(mwalajs.json());

mwalajs.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

mwalajs.set('view engine', 'ejs');
mwalajs.use(expressLayouts);        // <-- ADD THIS
mwalajs.set('layout', 'layouts/main');  // default layout

// Make logged-in user available in all views
mwalajs.use((req, res, next)=>{
  res.locals.user = req.session.user || null;
  next();
});

// Routes
mwalajs.use('/', authRoutes);
mwalajs.use('/foods', foodRoutes);
mwalajs.use('/admin', adminRoutes);

mwalajs.get('/', (req, res) => res.redirect('/login'));

const PORT = process.env.PORT || 3000;
mwalajs.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
