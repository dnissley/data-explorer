const MYSQL_HOST = 'MYSQL_HOST';
const MYSQL_DATABASE = 'MYSQL_DATABASE';
const MYSQL_USER = 'MYSQL_USER';
const MYSQL_PASSWORD = 'MYSQL_PASSWORD';
const MYSQL_CONNECTION_LIMIT = 'MYSQL_CONNECTION_LIMIT';

const required = (varName: string) => {
  const value = process.env[varName];
  if (value === undefined) {
    throw new Error(`Required environment variable not found: ${varName}`);
  }
  return value;
};

const requiredNumber = (varName: string) => {
  const value = process.env[varName];
  if (value === undefined) {
    throw new Error(`Required environment variable not found: ${varName}`);
  }
  if (Number.isNaN(value)) {
    throw new Error(
      `Required numeric environment variable not a number: ${varName}`
    );
  }
  return Number(value);
};

// const requiredBool = (varName: string) => { ... }

// const optional = (varName: string, defaultValue = '') => {
//   const value = process.env[varName];
//   if (value === undefined) {
//     return defaultValue;
//   }
//   return value;
// };

// const optionalNumber = (varName: string, defaultValue = 0) => { ... }

// const optionalBool = (varName: string, defaultValue = false) => { ... }

export default {
  mySql: {
    host: required(MYSQL_HOST),
    database: required(MYSQL_DATABASE),
    user: required(MYSQL_USER),
    password: required(MYSQL_PASSWORD),
    connectionLimit: requiredNumber(MYSQL_CONNECTION_LIMIT),
  },
};
