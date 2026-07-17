import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Supabase environment variables not loaded from .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dbFilePath = path.join(process.cwd(), "src", "data", "db.json");

async function migrate() {
  console.log("Starting database migration to Supabase...");

  if (!fs.existsSync(dbFilePath)) {
    console.error("Local db.json file not found.");
    return;
  }

  const dbData = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

  // 1. Migrate Users
  console.log("Migrating users...");
  for (const user of dbData.users || []) {
    const { error } = await supabase
      .from("users")
      .upsert({
        id: user.id,
        email: user.email,
        name: user.name
      }, { onConflict: "id" });
    
    if (error) {
      console.error(`Failed to migrate user ${user.email}:`, error.message);
    } else {
      console.log(`Migrated user: ${user.email}`);
    }
  }

  // 2. Migrate Enrollments
  console.log("Migrating enrollments...");
  for (const enrollment of dbData.enrollments || []) {
    const { error } = await supabase
      .from("enrollments")
      .upsert({
        id: enrollment.id,
        user_id: enrollment.userId,
        user_email: enrollment.userEmail,
        course_id: enrollment.courseId,
        enrolled_at: enrollment.enrolledAt,
        status: enrollment.status
      }, { onConflict: "id" });

    if (error) {
      console.error(`Failed to migrate enrollment id ${enrollment.id}:`, error.message);
    } else {
      console.log(`Migrated enrollment id: ${enrollment.id}`);
    }
  }

  // 3. Migrate Inquiries
  console.log("Migrating inquiries...");
  for (const inquiry of dbData.inquiries || []) {
    const { error } = await supabase
      .from("inquiries")
      .upsert({
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        submitted_at: inquiry.submittedAt
      }, { onConflict: "id" });

    if (error) {
      console.error(`Failed to migrate inquiry id ${inquiry.id}:`, error.message);
    } else {
      console.log(`Migrated inquiry id: ${inquiry.id}`);
    }
  }

  // 4. Migrate Certificates
  console.log("Migrating certificates...");
  for (const cert of dbData.certificates || []) {
    const { error } = await supabase
      .from("certificates")
      .upsert({
        id: cert.id,
        enrollment_id: cert.enrollmentId,
        user_id: cert.userId,
        course_id: cert.courseId,
        issue_date: cert.issueDate,
        grade: cert.grade,
        certificate_number: cert.certificateNumber,
        status: cert.status
      }, { onConflict: "id" });

    if (error) {
      console.error(`Failed to migrate certificate id ${cert.id}:`, error.message);
    } else {
      console.log(`Migrated certificate id: ${cert.id}`);
    }
  }

  console.log("Database migration script execution finished.");
}

migrate().catch((err) => {
  console.error("Migration error:", err);
});
