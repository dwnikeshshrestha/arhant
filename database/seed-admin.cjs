import sql from "mssql/msnodesqlv8";
import bcrypt from "bcryptjs";
// const bcrypt = require("bcryptjs");

const connectionString =
  "Driver={ODBC Driver 18 for SQL Server};Server=localhost;Database=ArhantWebsite;Trusted_Connection=yes;TrustServerCertificate=yes;";

async function seedAdmin() {
  const email = "admin@arhant.com";
  const password = "Admin@123"; // Change this after first login
  const name = "Admin";

  try {
    console.log("Connecting to database...");
    const pool = await new sql.ConnectionPool({ connectionString }).connect();

    // Check if admin already exists
    const existing = await pool
      .request()
      .input("email", email)
      .query("SELECT id FROM admin_users WHERE email = @email");

    if (existing.recordset.length > 0) {
      console.log(`Admin user '${email}' already exists.`);
      await pool.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert admin user
    await pool
      .request()
      .input("email", email)
      .input("password", hashedPassword)
      .input("name", name)
      .query(
        "INSERT INTO admin_users (email, password, name) VALUES (@email, @password, @name)",
      );

    console.log("Admin user created!");
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    console.log("\n  Change this password after your first login.");

    await pool.close();
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

seedAdmin();
