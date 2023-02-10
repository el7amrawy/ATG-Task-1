import client from "../database";
import { User } from "./users";
import encryption from "../services/encryption";

type Post = {
  id: string;
  content: string;
  creator_id: string;
};

class Posts {
  async index(): Promise<Post[]> {
    const sql = "SELECT * FROM posts";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql);

      const posts: Post[] = res.rows;
      conn.release();

      return posts.map((post) =>
        encryption.decryptObject(post)
      ) as unknown as Post[];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: Post["id"]): Promise<Post> {
    const sql = "SELECT * FROM posts WHERE id=$1";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);

      const post: Post = res.rows[0];
      conn.release();

      return encryption.decryptObject(post) as unknown as Post;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(
    creator_id: User["id"],
    content: Post["content"]
  ): Promise<Post> {
    const sql =
      "INSERT INTO posts (content, creator_id) VALUES ($1,$2) RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [
        encryption.encrypt(content),
        creator_id,
      ]);

      const post: Post = res.rows[0];
      conn.release();

      return encryption.decryptObject(post) as unknown as Post;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async update(id: Post["id"], content: Post["content"]): Promise<Post> {
    const sql = "UPDATE posts SET content=$1 WHERE id=$2 RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [encryption.encrypt(content), id]);

      const post: Post = res.rows[0];
      conn.release();

      return encryption.decryptObject(post) as unknown as Post;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async remove(id: Post["id"]): Promise<Post> {
    const sql = "DELETE FROM posts WHERE id=$1 RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);

      const post: Post = res.rows[0];
      conn.release();

      return encryption.decryptObject(post) as unknown as Post;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export { Post, Posts };
