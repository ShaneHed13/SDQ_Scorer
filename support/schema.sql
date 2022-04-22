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
    
CREATE TABLE sdqTests (
    id SERIAL PRIMARY KEY,
    sdq410pt TEXT NOT NULL,
    sdq1117pt TEXT NOT NULL,
    never TEXT NOT NULL,
    sometimes TEXT NOT NULL,
    always TEXT NOT NULL
);

CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
    );
    
INSERT INTO tests (name) VALUES
    ('SDQ 4-10 Parents/Teachers'),
    ('SDQ 11-17 Parents/Teachers'),
    ('SDQ 11-17 Self Report');
    
    INSERT INTO sdqTests (sdq410pt, sdq1117pt, never, sometimes, always) VALUES
    ('Considerate of other peoples feelings', 'Considerate of other peoples feelings', 0, 1, 2),
    ('Restless, overactive, cannot stay still for long', 'Restless, overactive, cannot stay still for long', 0, 1, 2),
    ('Often complains of headaches, stomach-aches or sickness', 'Often complains of headaches, stomach-aches or sickness', 0, 1, 2),
    ('Shares readily with other children, for example toys, treats, pencils', 'Shares readily with other youth, for example books, games, food', 0, 1, 2),
    ('Often loses temper', 'Often loses temper', 0, 1, 2),
    ('Rather solitary, prefers to play alone', 'Would rather be alone than with other youth', 0, 1, 2),
    ('Generally well behaved, usually does what adults request', 'Generally well behaved, usually does what adults request', 2, 1, 0),
    ('Many worries or often seems worried', 'Many worries or often seems worried',  0, 1, 2),
    ('Helpful if someone is hurt, upset or feeling ill', 'Helpful if someone is hurt, upset or feeling ill', 0, 1, 2),
    ('Constantly fidgeting or squirming', 'Constantly fidgeting or squirming', 0, 1, 2),
    ('Has at least one good friend', 'Has at least one good friend', 2, 1, 0),
    ('Often fights with other children or bullies them', 'Often fights with other youth or bullies them', 0, 1, 2),
    ('Often unhappy, depressed or tearful', 'Often unhappy, depressed or tearful', 0, 1, 2),
    ('Generally liked by other children', 'Generally liked by other youth', 2, 1, 0),
    ('Easily distracted, concentration wanders', 'Easily distracted, concentration wanders', 0, 1, 2),
    ('Nervous or clingy in new situations, easily loses confidence', 'Nervous in new situations, easily loses confidence', 0, 1, 2),
    ('Kind to younger children', 'Kind to younger children', 0, 1, 2),
    ('Often lies or cheats', 'Often lies or cheats', 0, 1, 2),
    ('Picked on or bullied by other children', 'Picked on or bullied by other youth', 0, 1, 2),
    ('Often offers to help others (parents, teachers, other children)', 'Often offers to help others (parents, teachers, other children)', 0, 1, 2),
    ('Thinks things out before acting', 'Thinks things out before acting', 2, 1, 0),
    ('Steals from home, school or elsewhere', 'Steals from home, school or elsewhere', 0, 1, 2),
    ('Gets along better with adults than with other children', 'Gets along better with adults than with other youth', 0, 1, 2),
    ('Many fears, easily scared', 'Many fears, easily scared', 0, 1, 2),
    ('Good attention span, sees work through to the end', 'Good attention span, sees work through to the end', 2, 1, 0);
 