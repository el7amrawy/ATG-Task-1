import client from "../database";

interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
  name: string;
}

class Users {
  async create(
    email: User["email"],
    password: User["password"],
    username: User["username"],
    name: User["name"]
  ): Promise<User> {
    const sql =
      "INSERT INTO ATGusers (email,password,username,name) VALUES ($1,$2,$3,$4) RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [email, password, username, name]);
      const user: User = res.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`couldn't create new user ${err}`);
    }
  }

  async authenticate(
    username: User["username"],
    password: User["password"]
  ): Promise<User | null> {
    const sql = "SELECT * FROM ATGusers WHERE username=$1";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [username]);
      const user: User = res.rows[0];

      conn.release();

      if (user.password === password) {
        delete user.password;
        return user;
      }
      return null;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getEmail(username: string): Promise<string> {
    const sql = "SELECT * FROM ATGusers WHERE username=$1";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [username]);
      const user: User = res.rows[0];

      conn.release();

      return user.email;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async updatePass(username: string, password: string): Promise<User> {
    const sql = "UPDATE ATGusers SET password=$1 WHERE username=$2 RETURNING *";
    try {
      const conn = await client.connect();

      const res = await conn.query(sql, [password, username]);
      const user: User = res.rows[0];

      conn.release();

      //   delete user.password;
      return user;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export { User, Users };
