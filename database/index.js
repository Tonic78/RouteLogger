import * as SQLite from "expo-sqlite";

const dataBase = SQLite.openDatabase("locations.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);",
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

export const insertLocation = (
  title,
  imageUri,
  address,
  latitude,
  longitude
) => {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO locations (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
        [title, imageUri, address, latitude, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchLocations = () => {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM locations",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
