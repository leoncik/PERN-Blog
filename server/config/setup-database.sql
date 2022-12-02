-- Uncomment these two commands if you need to clean your database.
-- DROP TABLE blog_posts;
-- DROP TABLE users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(300) NOT NULL UNIQUE,
    username VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL,
    registered_date DATE DEFAULT CURRENT_DATE,
    avatar VARCHAR(300)
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);