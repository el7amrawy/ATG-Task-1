import client from "../database";

type Comment = {
  id: string;
  content: string;
  post_id: string;
  creator_id: string;
};

class Comments {
  async show(post_id: Comment["post_id"]): Promise<Comment[]> {
    const sql = "SELECT * FROM comments WHERE post_id=$1";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [post_id]);

      const comments: Comment[] = res.rows;
      conn.release();

      return comments;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(
    content: Comment["content"],
    post_id: Comment["post_id"],
    creator_id: Comment["creator_id"]
  ): Promise<Comment> {
    const sql =
      "INSERT INTO comments (content,post_id,creator_id) VALUES ($1,$2,$3) RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [content, post_id, creator_id]);

      const comment: Comment = res.rows[0];
      conn.release();

      return comment;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async update(
    id: Comment["id"],
    content: Comment["content"]
  ): Promise<Comment> {
    const sql = "UPDATE comments SET content=$1 WHERE id=$2 RETURNING *";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [content, id]);

      const comment: Comment = res.rows[0];
      conn.release();

      return comment;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async remove(id: Comment["id"]): Promise<Comment> {
    const sql = "DELETE FROM comments WHERE id=$1 RETURNING *";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);

      const comment: Comment = res.rows[0];
      conn.release();

      return comment;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export { Comments, Comment };
