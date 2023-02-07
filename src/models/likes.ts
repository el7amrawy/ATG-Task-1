import client from "../database";

type Like = {
  id: string;
  post_id: string;
  creator_id: string;
};

class Likes {
  async index(post_id: Like["post_id"]): Promise<Number> {
    const sql = "SELECT * FROM likes WHERE post_id=$1";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [post_id]);

      const nLikes = res.rowCount;
      conn.release();

      return nLikes;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: Like["id"]): Promise<Like> {
    const sql = "SELECT * FROM likes WHERE id=$1";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);

      const like: Like = res.rows[0];
      conn.release();

      return like;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(
    post_id: Like["post_id"],
    creator_id: Like["creator_id"]
  ): Promise<Like> {
    const sql =
      "INSERT INTO likes (post_id, creator_id) VALUES ($1,$2) RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [post_id, creator_id]);

      const like: Like = res.rows[0];
      conn.release();

      return like;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async remove(creator_id: Like["creator_id"]): Promise<Like> {
    const sql = "DELETE FROM likes WHERE creator_id=$1 RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [creator_id]);

      const like: Like = res.rows[0];
      conn.release();

      return like;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export { Like, Likes };
