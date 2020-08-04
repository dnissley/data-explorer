import { escape, escapeId } from 'mysql';

export type EntityDefinition = {
  name: string;
  table: string;
  where: ColumnValuePairs;
};

export type ColumnValuePairs = {
  [columnName: string]: string[] | number[] | string | number | boolean | null; // maybe also Date?? moment?? what about nested parenthetical conditions?
};

function generateWhereClause(where: ColumnValuePairs): string {
  const conditions = Object.keys(where)
    .map((columnName) => {
      const value = where[columnName];
      if (value === null) {
        return `${escapeId(columnName)} IS NULL`;
      }
      return `${escapeId(columnName)} = ${escape(value)}`;
    })
    .join(' AND ');
  return `WHERE ${conditions}`;
}

export function generateSelectQuery(e: EntityDefinition): string {
  const tableName = escapeId(e.table);
  const whereClause = generateWhereClause(e.where);
  const query = `SELECT * FROM ${tableName} ${whereClause}`;
  // console.log('EXECUTING QUERY: ', query);
  return query;
}
