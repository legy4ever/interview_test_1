import sqlite3 from 'sqlite3';
import { getObject } from '../utils/objectUtils';
import { createQuery, insertQuery, selectQuery } from '../utils/queryUtils';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

let db = new sqlite3.Database(":memory:", (err: any) => {
  if (err) {
    console.log("Error Occurred - " + err.message);
  } else {
    console.log("DataBase Connected");
  }
})

export const createConnection = () => {
  return db.run(createQuery, (err: any) => {
    if (err) return
    console.log("Table candidatos Created")
  })
}

export const selectRows = async () => {
  return new Promise(resolve => {
    db.all(selectQuery, [], (err: any, rows: any) => {
      if (err) return
      resolve(rows)
    })
  })
}

export const insertRows = async (req: any) => {
  return db.serialize(() => {
    db.run(insertQuery, [uuidv4(), req.body.name, req.body.skills], (err: any) => {
      if (err) return
    })
  })
}