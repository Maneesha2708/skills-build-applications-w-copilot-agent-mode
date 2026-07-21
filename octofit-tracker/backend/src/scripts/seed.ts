import { connectToDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany([
      { name: 'Ava Chen', email: 'ava.chen@example.com', fitnessGoal: 'Run a half marathon' },
      { name: 'Liam Ortiz', email: 'liam.ortiz@example.com', fitnessGoal: 'Build strength' },
      { name: 'Nia Brooks', email: 'nia.brooks@example.com', fitnessGoal: 'Improve mobility' },
    ]);

    await Team.insertMany([
      { name: 'Momentum Squad', goal: 'Weekly consistency', location: 'Seattle' },
      { name: 'Peak Performers', goal: 'Competitive training', location: 'Austin' },
    ]);

    await Activity.insertMany([
      { userName: 'Ava Chen', type: 'Run', durationMinutes: 35, distanceMiles: 4.2 },
      { userName: 'Liam Ortiz', type: 'Strength', durationMinutes: 50 },
      { userName: 'Nia Brooks', type: 'Yoga', durationMinutes: 30, distanceMiles: 0 },
    ]);

    await LeaderboardEntry.insertMany([
      { name: 'Ava Chen', score: 142, teamName: 'Momentum Squad' },
      { name: 'Liam Ortiz', score: 128, teamName: 'Peak Performers' },
      { name: 'Nia Brooks', score: 119, teamName: 'Momentum Squad' },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Circuit', durationMinutes: 25, intensity: 'High' },
      { name: 'Recovery Mobility', durationMinutes: 20, intensity: 'Low' },
      { name: 'Tempo Run', durationMinutes: 40, intensity: 'Medium' },
    ]);

    console.log('Database seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
