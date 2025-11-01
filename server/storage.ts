import { type User, type InsertUser, type TypingResult, type InsertTypingResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createTypingResult(result: InsertTypingResult): Promise<TypingResult>;
  getTypingResults(limit?: number): Promise<TypingResult[]>;
  getTypingResultsByLanguage(language: string, limit?: number): Promise<TypingResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private typingResults: Map<string, TypingResult>;

  constructor() {
    this.users = new Map();
    this.typingResults = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTypingResult(insertResult: InsertTypingResult): Promise<TypingResult> {
    const id = randomUUID();
    const result: TypingResult = {
      ...insertResult,
      id,
      createdAt: new Date(),
      errorDetails: insertResult.errorDetails || null,
    };
    this.typingResults.set(id, result);
    return result;
  }

  async getTypingResults(limit: number = 50): Promise<TypingResult[]> {
    const results = Array.from(this.typingResults.values());
    return results
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getTypingResultsByLanguage(language: string, limit: number = 50): Promise<TypingResult[]> {
    const results = Array.from(this.typingResults.values());
    return results
      .filter((r) => r.language === language)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
