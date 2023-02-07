/* Replace with your SQL commands */
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    creator_id BIGINT REFERENCES atgusers(id) NOT NULL
)