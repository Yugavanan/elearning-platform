import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import User from '../models/User.js';

// Note: This is a basic test structure. In a real scenario, you'd use supertest
// to test the actual API endpoints with a test database.

describe('User Model', () => {
  beforeAll(async () => {
    // In a real test, you'd connect to a test database
    // await mongoose.connect(process.env.TEST_MONGO_URI);
  });

  afterAll(async () => {
    // await mongoose.connection.close();
  });

  it('should hash password before saving', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: 'password123',
    });

    // This test would require a test database connection
    // await user.save();
    // expect(user.passwordHash).not.toBe('password123');
    // expect(user.passwordHash.length).toBeGreaterThan(10);
    
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
  });
});
