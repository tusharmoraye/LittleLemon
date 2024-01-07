import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        console.log("create table");
        // tx.executeSql("drop table menuitems");
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, description text, price text, category text, image text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    const placeholders = menuItems.map(() => "(?, ?, ?, ?, ?)").join(",");
    tx.executeSql(
      `insert into menuitems (name, description, price, category, image) values ${placeholders}`,
      menuItems.reduce(
        (acc, item) => [
          ...acc,
          item.name,
          item.description,
          item.price,
          item.category,
          item.image,
        ],
        []
      )
    );
  });
}

export async function filterByQueryAndCategories(
  query = "",
  activeCategories = []
) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const categories = activeCategories
        .map((category) => `'${category}'`)
        .join(",");
      console.log("categories: ", categories);
      console.log("query: ", query);
      tx.executeSql(
        `select * from menuitems where name like ? and category in (${categories})`,
        [`%${query}%`],
        (_, { rows }) => {
          resolve(rows._array);
        },
        reject
      );
    });
  });
}

export async function clearData() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // tx.executeSql("delete from menuitems");
        tx.executeSql("drop table menuitems");
      },
      reject,
      resolve
    );
  });
}
