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


-- Populate database with some registered users
INSERT INTO users (username, email, password)
VALUES (
    'John Titor',
    'j.titor@traveller.com',
    'qwerty123'
    ), (
    'Caeiro',
    'alberto.caeiro@gmail.com',
    'azerty123'
);



-- Populate database with some posts
-- ! Note : do not forget to change the "user_id" to match the UUID generated after creating the users.
INSERT INTO blog_posts (title, content, user_id)
VALUES (
    'Musical discovery of the day',
    'Saltykov made a very nice transcription of the Lacrimosa. It is worth playing !',
    '4b956cfe-2bac-43a2-82d8-95c9fcfeefbe'
    ), (
    'A strange word',
    'Velleity. A wish or inclination not strong enough to lead to action.',
    '4b956cfe-2bac-43a2-82d8-95c9fcfeefbe'
    ), (
    'First day of snow',
    'It started snowing today !… Yes It is a dream, and this is the reason why it was so beautiful.',
    '61364739-9af1-47e7-a274-1e6e440c407b'
);