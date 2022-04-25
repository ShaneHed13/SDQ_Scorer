const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5005;
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
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

  .get('/db-info', async (req, res) => {

    try {
      const client = await pool.connect();

      const completedSDQ = await client.query(

        `SELECT * FROM completedSDQ`
      );
      const locals = {

        'completedSDQ': (completedSDQ) ? completedSDQ.rows : null,

      };

      res.render('pages/db-info', locals);
      client.release();

    }
    catch (err) {

      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/sdq410pt', async (req, res) => {

    try {
      const client = await pool.connect();
      const sdqTests = await client.query(

        `SELECT * FROM sdqTests`
      );

      const locals = {

        'sdqTests': (sdqTests) ? sdqTests.rows : null,

      };

      res.render('pages/sdq410pt.ejs', locals);
      client.release();

    }
    catch (err) {

      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/sdq1117pt', async (req, res) => {

    try {
      const client = await pool.connect();
      const sdqTests = await client.query(

        `SELECT * FROM sdqTests`
      );

      const locals = {

        'sdqTests': (sdqTests) ? sdqTests.rows : null,

      };

      res.render('pages/sdq1117pt.ejs', locals);
      client.release();

    }
    catch (err) {

      console.error(err);
      res.send("Error: " + err);
    }

  })

  .get('/student-records', async (req, res) => {
    try {
      const client = await pool.connect();

      const completedSDQ = await client.query(
        // Dummy SQL command to allow page load
        `SELECT * FROM completedSDQ WHERE child = ''`
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

  .get('/student-records/:child', async (req, res) => {
    try {
      const client = await pool.connect();

      const completedSDQ = await client.query(
        `SELECT * FROM completedSDQ WHERE child = '${req.params.child}'`
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

  .post('/log', async (req, res) => {
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
      const role = req.body.role;
      const expires = req.body.expires;


      const sqlInsert = await client.query(
        `INSERT INTO completedSDQ (child, birthdate, total, emotional, conduct, hyperactivity, peer, prosocial, impact, completedby, role, expires)
        VALUES('${child}', '${dob}', ${total}, ${emotional}, ${conduct}, ${hyperactivity} , ${peer}, ${prosocial}, ${impact}, '${completed}', '${role}', '${expires}')
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

  .listen(PORT, () => console.log('Listening on ${ PORT }'));



