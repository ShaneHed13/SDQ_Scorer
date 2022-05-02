CREATE TABLE completedSDQ (
  id SERIAL PRIMARY KEY,
  child TEXT NOT NULL,
  birthdate DATE NOT NULL,
  total TEXT NOT NULL,
  emotional TEXT NOT NULL,
  conduct TEXT NOT NULL,
  hyperactivity TEXT NOT NULL,
  peer TEXT NOT NULL,
  prosocial TEXT NOT NULL,
  impact TEXT NOT NULL,
  completedBy TEXT NOT NULL,
  role TEXT NOT NULL,
  expires DATE NOT NULL
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  child TEXT NOT NULL,
  birthdate DATE NOT NULL,
  total INT NOT NULL,
  emotional INT NOT NULL,
  conduct INT NOT NULL,
  hyperactivity INT NOT NULL,
  peer INT NOT NULL,
  prosocial INT NOT NULL,
  impact INT NOT NULL,
  completedBy TEXT NOT NULL,
  role TEXT NOT NULL,
  expires DATE NOT NULL
);
    
CREATE TABLE sdqTests (
  id SERIAL PRIMARY KEY,
  sdq410pt TEXT NOT NULL,
  sdq1117pt TEXT NOT NULL,
  sdq1117s TEXT NOT NULL,
  never TEXT NOT NULL,
  sometimes TEXT NOT NULL,
  always TEXT NOT NULL
);

CREATE TABLE impactSupplement (
  id SERIAL PRIMARY KEY,
  parent TEXT NOT NULL,
  teacher TEXT NOT NULL,
  notAtAll INT NOT NULL,
  little INT NOT NULL,
  mediumAmt INT NOT NULL,
  great INT NOT null
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  UNIQUE (email)
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);  

INSERT INTO impactSupplement (parent, teacher, notAtAll, little, mediumAmt, great) VALUES
('Do the difficulties upset or distress your child?', 'Do the difficulties upset or distress you?', 0, 0, 1, 2),
('HOME LIFE', 'HOME LIFE', 0, 0, 1, 2),
('FRIENDSHIPS', 'FRIENDSHIPS', 0, 0, 1, 2),
('CLASSSROOM LEARNING', 'CLASSROOM LEARNING', 0, 0, 1, 2),
('LEISURE ACTIVITIES', 'LEISURE ACTIVITIES', 0, 0, 1, 2),
('Do the difficilties put a burden on you or the family as a whole?', 'Do the difficulties make it harder for those around you (family, friends, teachers, etc.)?', 0, 0, 1, 2);   


INSERT INTO tests (name) VALUES
  ('SDQ 4-10 Parents/Teachers'),
  ('SDQ 11-17 Parents/Teachers'),
  ('SDQ 11-17 Self Report');
    
INSERT INTO sdqTests (sdq410pt, sdq1117pt, sdq1117s, never, sometimes, always) VALUES
  ('Considerate of other peoples feelings', 'Considerate of other peoples feelings', 'I try to be nice to other people. I care about their feelings', 0, 1, 2),
  ('Restless, overactive, cannot stay still for long', 'Restless, overactive, cannot stay still for long', 'I am restless, I cannot stay still for long', 0, 1, 2),
  ('Often complains of headaches, stomach-aches or sickness', 'Often complains of headaches, stomach-aches or sickness', 'I get a lot of headaches, sthomach-aches, or sickness', 0, 1, 2),
  ('Shares readily with other children, for example toys, treats, pencils', 'Shares readily with other youth, for example books, games, food', 'I usually share with others, for example CDs, games, food', 0, 1, 2),
  ('Often loses temper', 'Often loses temper', 'I get ver angry and often lose my temper', 0, 1, 2),
  ('Rather solitary, prefers to play alone', 'Would rather be alone than with other youth', 'I would rather be alone than with play with people of my age', 0, 1, 2),
  ('Generally well behaved, usually does what adults request', 'Generally well behaved, usually does what adults request', 'I usually do as I am told', 2, 1, 0),
  ('Many worries or often seems worried', 'Many worries or often seems worried', 'I worry a lot',  0, 1, 2),
  ('Helpful if someone is hurt, upset or feeling ill', 'Helpful if someone is hurt, upset or feeling ill', 'I am helpful if someone is hurt, upset or feeling ill', 0, 1, 2),
  ('Constantly fidgeting or squirming', 'Constantly fidgeting or squirming', 'I am constantly fidgeting or squirming', 0, 1, 2),
  ('Has at least one good friend', 'Has at least one good friend', 'I have one good friend or more', 2, 1, 0),
  ('Often fights with other children or bullies them', 'Often fights with other youth or bullies them', 'I fight alot.  I can make other people do what I want', 0, 1, 2),
  ('Often unhappy, depressed or tearful', 'Often unhappy, depressed or tearful', 'I am often unhappy, depressed, or tearful', 0, 1, 2),
  ('Generally liked by other children', 'Generally liked by other youth', 'Other people my age generally like me', 2, 1, 0),
  ('Easily distracted, concentration wanders', 'Easily distracted, concentration wanders', 'I am easily distracted, I find it difficult to concentrate', 0, 1, 2),
  ('Nervous or clingy in new situations, easily loses confidence', 'Nervous in new situations, easily loses confidence', 'I am nervious in new situations. I easily lose confidence', 0, 1, 2),
  ('Kind to younger children', 'Kind to younger children', 'I am kind to younger children', 0, 1, 2),
  ('Often lies or cheats', 'Often lies or cheats','I am often accused of lying', 0, 1, 2),
  ('Picked on or bullied by other children', 'Picked on or bullied by other youth', 'Other children or young people pick on me or bully me', 0, 1, 2),
  ('Often offers to help others (parents, teachers, other children)', 'Often offers to help others (parents, teachers, other children)', 'I often offer to help others (parents, teachers, children)', 0, 1, 2),
  ('Thinks things out before acting', 'Thinks things out before acting', 'I think before I do things', 2, 1, 0),
  ('Steals from home, school or elsewhere', 'Steals from home, school or elsewhere', 'I take things that are not mine from home, school or elsewhere', 0, 1, 2),
  ('Gets along better with adults than with other children', 'Gets along better with adults than with other youth', 'I get along better with adults than with people my own age', 0, 1, 2),
  ('Many fears, easily scared', 'Many fears, easily scared', 'I have many fears, I am easily scared', 0, 1, 2),
  ('Good attention span, sees work through to the end', 'Good attention span, sees work through to the end', 'I finish the work Im doing. My intentions are good', 2, 1, 0);
