CREATE TABLE observations (
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    sutdents_id INT NOT NULL,
    tasks_id INT NOT NULL,
    duration INTERVAL NOT NULL
    );
    
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
    );
    
INSERT INTO tests (name) VALUES
    ('SDQ 4-10 Parents/Teachers'),
    ('SDQ 11-17 Parents/Teachers'),
    ('SDQ 11-17 Self Report');
 