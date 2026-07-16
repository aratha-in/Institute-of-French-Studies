import fs from "fs";
import path from "path";
import { Course } from "../data/courses";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Enrollment {
  id: number;
  userId: string;
  userEmail: string;
  courseId: number;
  enrolledAt: string;
  status: string;
  course?: Course;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export interface Certificate {
  id: number;
  enrollmentId: number;
  userId: string;
  courseId: number;
  issueDate: string;
  grade: string;
  certificateNumber: string;
  status: string; // "Active" | "Revoked"
  course?: Course;
}

export interface DatabaseSchema {
  users: User[];
  enrollments: Enrollment[];
  inquiries: Inquiry[];
  certificates: Certificate[];
}

const dbFilePath = path.join(process.cwd(), "src", "data", "db.json");

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(dbFilePath)) {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
      const initialDb: DatabaseSchema = { users: [], enrollments: [], inquiries: [], certificates: [] };
      fs.writeFileSync(dbFilePath, JSON.stringify(initialDb, null, 2), "utf-8");
      return initialDb;
    }
    const fileContent = fs.readFileSync(dbFilePath, "utf-8");
    const parsed = JSON.parse(fileContent);
    // Ensure certificates array exists for backward compatibility
    if (!parsed.certificates) {
      parsed.certificates = [];
    }
    return parsed as DatabaseSchema;
  } catch (error) {
    console.error("Failed to read JSON DB:", error);
    return { users: [], enrollments: [], inquiries: [], certificates: [] };
  }
}

export function writeDb(data: DatabaseSchema): void {
  try {
    fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write JSON DB:", error);
  }
}
