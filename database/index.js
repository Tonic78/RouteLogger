import * as SQLite from "expo-sqlite";

const dataBase = SQLite.openDatabase("locations.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, logitude REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
