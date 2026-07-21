import express, { type Request, type Response } from 'express';
import { connectToDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT) || 8000;

function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
}

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.post('/api/users/', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json(leaderboard);
});

app.post('/api/leaderboard/', async (req: Request, res: Response) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
