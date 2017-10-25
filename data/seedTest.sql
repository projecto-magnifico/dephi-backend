DROP DATABASE IF EXISTS delphi_test;
CREATE DATABASE delphi_test;

\c delphi_test;


CREATE TABLE threads (
    thread_id SERIAL PRIMARY KEY,
    score DECIMAL NOT NULL
);

CREATE TABLE keywords (
    keyword_id SERIAL PRIMARY KEY,
    word VARCHAR NOT NULL,
    thread_id INT NOT NULL,
    strength DECIMAL NOT NULL,
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
);

CREATE TABLE sources (
    source_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    logo_url VARCHAR NOT NULL
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    thread_id INT NOT NULL,
    headline VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    age INT NOT NULL,
    source_id INT NOT NULL,
    image VARCHAR,
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id),
    FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

INSERT INTO threads (score) VALUES (10), (8.1), (6.5), (2.8), (1.1);

INSERT INTO keywords (thread_id, word, strength) VALUES
(1, 'death', 1.3),
(1, 'man', 1.1),
(2, 'storm', 1.8),
(3, 'cork', 1.8),
(3, 'child', 1.4),
(3, 'meal', 1),
(4, 'monkey', 1.5),
(5, 'river', 1.9);

INSERT INTO sources (name, logo_url) VALUES ('bbc', 'bbc logo URL'), ('cnn', 'cnn logo URL'), ('al-j', 'aljlogourl'), ('abcAus', 'abcauslogourl');

INSERT INTO articles (thread_id, headline, description, url, age, source_id) VALUES 
(1, 'Man dies', 'Yes, a man has died', 'url innit', 0, 1),
(1, 'Death of man', 'Reports of man death', 'url innit 2', 1, 1),
(2, 'Big storm', 'There was a big storm', 'a stormy url', 0, 2),
(3, 'Child eats cork', 'A cork is eaten by a child', 'a corky url', 4, 2),
(3, 'Cork shock', 'Shocking scenes with a child and cork', 'a corky url 2', 4, 3),
(5, 'River flows', 'River continues to flow', 'a rivery url', 3, 1);




