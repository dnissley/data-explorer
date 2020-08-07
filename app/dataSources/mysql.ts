import {
  createPool,
  FieldInfo,
  Pool,
  QueryOptions,
  queryCallback,
} from 'mysql';
import config from '../config';

type MySQLConnectionConfiguration = {
  host: string;
  database: string;
  user: string;
  password: string;
  connectionLimit: number;
};

export type DbTypes = string | number | boolean | null;
type DbRecord = { [columnName: string]: DbTypes };

type QueryResult = {
  records: DbRecord[];
  fields?: FieldInfo[];
};

class MySQLConnectionInterface {
  constructor(mySqlConfig: MySQLConnectionConfiguration) {
    this.pool = createPool(mySqlConfig);
  }

  public pool: Pool;

  public query(options: string | QueryOptions, values?: DbTypes[]) {
    return new Promise<QueryResult>((resolve, reject) => {
      const handleResponse: queryCallback = (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve({ records: JSON.parse(JSON.stringify(results)), fields });
        }
      };
      if (values == null) {
        this.pool.query(options, handleResponse);
      } else {
        this.pool.query(options, values, handleResponse);
      }
    });
  }
}

export default new MySQLConnectionInterface({
  host: config.mySql.host,
  database: config.mySql.database,
  user: config.mySql.user,
  password: config.mySql.password,
  connectionLimit: config.mySql.connectionLimit,
});
