"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function connectToDatabase() {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default.connection;
    }
    await mongoose_1.default.connect(connectionString);
    return mongoose_1.default.connection;
}
exports.default = mongoose_1.default.connection;
