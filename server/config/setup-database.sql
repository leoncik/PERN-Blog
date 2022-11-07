CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(300) NOT NULL,
    username VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL
)

-- Populate database with some posts
INSERT INTO blog_posts (title, content)
VALUES (
    'Musical discovery of the day',
    'Saltykov made a very nice transcription of the Lacrimosa. It is worth playing !'
    ), (
    'A strange word',
    'Velleity. A wish or inclination not strong enough to lead to action.'
    ), (
    'First day of snow',
    'It started snowing today !… Yes It is a dream, and this is the reason why it was so beautiful.'
);

-- Add some registered users
-- INSER INTO users (username, email, password)
-- VALUES (
--     'John Titor',
--     'j.titor@traveller.com',
--     'qwerty123'
--     ), (
--     'Caeiro',
--     'alberto.caeiro@gmail.com',
--     'azerty123'
--     )