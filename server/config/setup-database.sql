CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL
);

-- Populate database with some posts
INSERT INTO blog_posts (title, content)
VALUES ('Musical discovery of the day', 'Saltykov made a very nice transcription of the Lacrimosa. It is worth playing !');

INSERT INTO blog_posts (title, content)
VALUES ('A strange word', 'Velleity. A wish or inclination not strong enough to lead to action.');

INSERT INTO blog_posts (title, content)
VALUES ('First day of snow', 'It started snowing today !… Yes It is a dream, and this is the reason why it was so beautiful.');