// const sql = require("mssql/msnodesqlv8");
import sql from "mssql/msnodesqlv8";


const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=localhost;Database=ArhantWebsite;Trusted_Connection=yes;TrustServerCertificate=yes;",
};

async function test() {
  try {
    console.log("Connecting to SQL Server (Windows Auth)...");
    const pool = await new sql.ConnectionPool(config).connect();
    console.log("Connected!\n");

    const result = await pool.request().query("SELECT id, title, category FROM blogs");
    console.log("Blogs in database:");
    console.table(result.recordset);

    await pool.close();
    console.log("\nConnection works! Ready for Step 2.");
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

test();
