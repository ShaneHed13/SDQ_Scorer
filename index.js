const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5005;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');


const initializePassport = require('./passportConfig');

initializePassport(passport);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true })) //false??
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async (req, res) => {

    try {
      const client = await pool.connect();
      const completedSDQ = await client.query(
        `SELECT * FROM tests`
      );

      const locals = {
        'completedSDQ': (completedSDQ) ? completedSDQ.rows : null,
      };

      res.render('pages/index', locals);
      client.release();
    }

    catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/db-info', checkNotAuthenticated, async (req, res) => {

    try {
      const client = await pool.connect();

      const completedSDQ = await client.query(
        `SELECT * FROM completedSDQ WHERE scoredBy = '${req.user.email}'`
      );

      const locals = {
        'completedSDQ': (completedSDQ) ? completedSDQ.rows : null
      };

      res.render('pages/db-info.ejs', locals);
      client.release();

    }
    catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/sdqPage', checkNotAuthenticated, async (req, res) => {

    try {
      const client = await pool.connect();
      const testQuestions = await client.query(

        `SELECT * FROM sdqTests`
      );

      const impactQuestions = await client.query(

        `SELECT * FROM impactSupplement`
      );

      const locals = {

        'testQuestions': (testQuestions) ? testQuestions.rows : null,
        'impactQuestions': (impactQuestions) ? impactQuestions.rows : null,
         user: req.user.name,
         email: req.user.email 
      };

      res.render('pages/sdqPage.ejs', locals);
      client.release();

    }
    catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/student-records', checkNotAuthenticated, async (req, res) => {
    try {
      const client = await pool.connect();

      const completedSDQ = await client.query(
        // Dummy SQL command to allow page load
        `SELECT * FROM completedSDQ WHERE child = '' AND scoredBy = '${req.user.email}'`
      );
      const locals = {
        'completedSDQ': (completedSDQ) ? completedSDQ.rows : null,
      };

      res.render('pages/student-records', locals);
      client.release();

    }
    catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }
  })

  .get('/student-records/:child', checkNotAuthenticated, async (req, res) => {
    try {
      const client = await pool.connect();

      const completedSDQ = await client.query(
        `SELECT * FROM completedSDQ WHERE child = '${req.params.child}' AND scoredBy = '${req.user.email}'`
      );
      const locals = {
        'completedSDQ': (completedSDQ) ? completedSDQ.rows : null,
      };

      res.render('pages/student-records', locals);
      client.release();

    }

    catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }
  })

  .get('/results', checkNotAuthenticated, async (req, res) => {

    try {
      const client = await pool.connect();
      const results = await client.query(
        `SELECT * FROM results`
      );

      const locals = {
        'results': (results) ? results.rows : null,
        user: req.user.name,
        email: req.user.email 
      };

      res.render('pages/results.ejs', locals);
      client.release();

    }
    catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/register', checkAuthenticated, (req, res) => {
    res.render('pages/register');
  })

  .get('/login', checkAuthenticated, async (req, res) => {
    res.render('pages/login');
  })

  .get('/home', checkNotAuthenticated, async (req, res) => {
    res.render('pages/home', { user: req.user.name });
  })

  .get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are now logged out.');
    res.redirect('/login');
  })

  .post('/register', async (req, res) => {
    let { name, email, password, confirm_password } = req.body;

    let errors = []; // use for form validation

      hashedPassword = await bcrypt.hash(password, 10);

      // Validation passed
      pool.query(
        `SELECT * FROM users
          WHERE email = $1`,
        [email],
        (err, results) => {

          if (results.rows.length > 0) {

            errors.push({ message: "Email already registered"})
            res.render('pages/register', { errors, name, email, password, confirm_password });


          } else {
            
            pool.query(
              `INSERT INTO users (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, password`,
              [name, email, hashedPassword],
              (err, results) => {
                if (err) {
                  throw err;
                }
                req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/login");
              }
            );
          }
        }
      );

  })

  .post('/login',
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    })
  )

  .post('/log', checkNotAuthenticated, async (req, res) => {
    try {
      const client = await pool.connect(); ``
      const child = req.body.child;
      const dob = req.body.dob;
      const total = req.body.total;
      const emotional = req.body.emotional;
      const conduct = req.body.conduct;
      const hyperactivity = req.body.hyperactivity;
      const peer = req.body.peer;
      const prosocial = req.body.prosocial;
      const impact = req.body.impact;
      const completed = req.body.completed;
      const scored = req.body.scored;
      const role = req.body.role;
      const expires = req.body.expires;


      const sqlInsert = await client.query(
        `INSERT INTO completedSDQ (child, birthdate, total, emotional, conduct, hyperactivity, peer, prosocial, impact, completedBy, scoredBy, role, expires)
        VALUES('${child}', '${dob}', '${total}', '${emotional}', '${conduct}', '${hyperactivity}' , '${peer}', '${prosocial}', '${impact}', '${completed}', '${scored}', '${role}', '${expires}')
        RETURNING id as new_id;`);


      const result = {

        'response': (sqlInsert) ? (sqlInsert.rows[0]) : null

      };
      res.set({
        'Content-Type': 'application/json'

      });
      res.json({ requestBody: result });
      client.release();


    }
    catch (err) {

      console.error(err);
      res.send("Error: " + err);
    }

  })

  .post('/results', checkNotAuthenticated, async (req, res) => {
    try {
      const client = await pool.connect();
      const child = req.body.child;
      const dob = req.body.dob;
      const total = req.body.total;
      const emotional = req.body.emotional;
      const conduct = req.body.conduct;
      const hyperactivity = req.body.hyperactivity;
      const peer = req.body.peer;
      const prosocial = req.body.prosocial;
      const impact = req.body.impact;
      const completed = req.body.completed;
      const scored = req.body.scored;
      const role = req.body.role;
      const expires = req.body.expires;

      const emptyTable = await client.query(
        `TRUNCATE TABLE results;`
      );

      const sqlInsert = await client.query(
        `INSERT INTO results (child, birthdate, total, emotional, conduct, hyperactivity, peer, prosocial, impact, completedBy, scoredBy, role, expires)
        VALUES('${child}', '${dob}', ${total}, ${emotional}, ${conduct}, ${hyperactivity}, ${peer}, ${prosocial}, '${impact}', '${completed}', '${scored}', '${role}', '${expires}')
        RETURNING id as new_id;`);


      const result = {

        'response': (sqlInsert) ? (sqlInsert.rows[0]) : null

      };

      res.set({
        'Content-Type': 'application/json'

      });
      res.json({ requestBody: result });
      client.release();


    }
    catch (err) {

      console.error(err);
      res.send("Error: " + err);
    }

  })

  .listen(PORT, () => {
    console.log('Listening on PORT:' + PORT)
  });

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login');
}



