CREATE TABLE completedSDQ (
    id SERIAL PRIMARY KEY,
    total INT NOT NULL,
    emotional INT NOT NULL,
    conduct INT NOT NULL,
    hyperactivity INT NOT NULL,
    peer INT NOT NULL,
    prosocial INT NOT NULL,
    impact INT NOT NULL,
    expires DATE NOT NULL
    );
    
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
    );
    
INSERT INTO tests (name) VALUES
    ('SDQ 4-10 Parents/Teachers'),
    ('SDQ 11-17 Parents/Teachers'),
    ('SDQ 11-17 Self Report');
 