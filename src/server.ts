import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Demo user — replaces Auth0 for the public demo
const DEMO_USER = {
  sub: 'demo_user_001',
  name: 'Demo User',
  email: 'demo@example.com',
  sid: 'demo_session'
};

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Mock OIDC middleware — makes req.oidc always available with demo user
app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).oidc = {
    isAuthenticated: () => true,
    user: DEMO_USER,
    login: (_opts?: unknown) => {}
  };
  next();
});

// Make user available to all EJS views
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.user = DEMO_USER;
  next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

// Body parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

// Auth routes — redirect to /tasks in demo mode
app.get('/login', (_req: Request, res: Response) => {
  res.redirect('/tasks');
});

app.get('/logout', (_req: Request, res: Response) => {
  res.redirect('/tasks');
});

// Home
app.get('/', (_req: Request, res: Response) => {
  res.render('index', {
    user: DEMO_USER,
    isAuthenticated: true,
    t: { user: 'User' }
  });
});

// Profile
app.get('/profile', (_req: Request, res: Response) => {
  res.render('profile', {
    user: DEMO_USER,
    userProfile: JSON.stringify(DEMO_USER, null, 2),
    t: { user: 'User' }
  });
});

// Task routes
app.use('/', taskRoutes);

// 404
app.use((_req: Request, res: Response) => {
  res.status(404).render('404');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
