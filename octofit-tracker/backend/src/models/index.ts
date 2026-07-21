import mongoose, { Schema } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  fitnessGoal: string;
}

interface ITeam {
  name: string;
  goal: string;
  location: string;
}

interface IActivity {
  userName: string;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
}

interface ILeaderboardEntry {
  name: string;
  score: number;
  teamName: string;
}

interface IWorkout {
  name: string;
  durationMinutes: number;
  intensity: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, default: 'Build consistency' },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  goal: { type: String, required: true },
  location: { type: String, default: 'Remote' },
});

const activitySchema = new Schema<IActivity>({
  userName: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceMiles: { type: Number, default: 0 },
});

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  teamName: { type: String, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
