// eslint-disable-next-line @typescript-eslint/no-require-imports
const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=localhost;Database=ArhantWebsite;Trusted_Connection=yes;TrustServerCertificate=yes;",
};
// const config = {
//   server: "localhost",
//   database: "ArhantWebsite",
//   options: {
//     trustedConnection: true, // Set to true if using Windows Authentication
//     trustServerCertificate: true, // Set to true if using self-signed certificates
//   },
//   // driver: "ODBC Driver 18 for SQL Server", // Uncomment to use specific driver
// };
let pool: typeof sql.ConnectionPool | null = null;
let connecting: Promise<typeof sql.ConnectionPool> | null = null;

export async function getDb() {
  if (pool) return pool;
  if (!connecting) {
    connecting = sql.connect(config).then((p: typeof sql.ConnectionPool) => {
      pool = p;
      return p;
    });
  }
  return connecting;
}

export { sql };
