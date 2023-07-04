/* Replace with your SQL commands */
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    creator_id BIGINT REFERENCES users(id) NOT NULL
)