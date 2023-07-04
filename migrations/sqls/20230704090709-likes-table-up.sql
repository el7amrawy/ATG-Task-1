/* Replace with your SQL commands */
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id BIGINT REFERENCES posts(id) NOT NULL,
    creator_id BIGINT REFERENCES users(id) NOT NULL
)