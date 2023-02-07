/* Replace with your SQL commands */
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id BIGINT REFERENCES posts(id),
    creator_id BIGINT REFERENCES atgusers(id)
);