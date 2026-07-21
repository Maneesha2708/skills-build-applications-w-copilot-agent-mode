"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const users = [{ id: 1, name: 'Ava Chen', email: 'ava@example.com' }];
const teams = [{ id: 1, name: 'Momentum Squad', goal: 'Weekly consistency' }];
const activities = [{ id: 1, name: 'Morning Run', duration: 30 }];
const leaderboard = [{ id: 1, name: 'Ava Chen', score: 120 }];
const workouts = [{ id: 1, name: 'HIIT Circuit', intensity: 'high' }];
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
}
function createItem(items, body) {
    const item = { id: Date.now(), ...body };
    items.push(item);
    return item;
}
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});
app.get('/api/users/', (_req, res) => {
    res.json(users);
});
app.post('/api/users/', (req, res) => {
    const user = createItem(users, req.body);
    res.status(201).json(user);
});
app.get('/api/teams/', (_req, res) => {
    res.json(teams);
});
app.post('/api/teams/', (req, res) => {
    const team = createItem(teams, req.body);
    res.status(201).json(team);
});
app.get('/api/activities/', (_req, res) => {
    res.json(activities);
});
app.post('/api/activities/', (req, res) => {
    const activity = createItem(activities, req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard/', (_req, res) => {
    res.json(leaderboard);
});
app.post('/api/leaderboard/', (req, res) => {
    const entry = createItem(leaderboard, req.body);
    res.status(201).json(entry);
});
app.get('/api/workouts/', (_req, res) => {
    res.json(workouts);
});
app.post('/api/workouts/', (req, res) => {
    const workout = createItem(workouts, req.body);
    res.status(201).json(workout);
});
mongoose_1.default
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db')
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
