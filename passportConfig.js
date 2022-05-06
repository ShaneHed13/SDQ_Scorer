const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        }

        console.log(result.rows);

        if (result.rows.length > 0) {
          const user = result.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Email or password is invalid.' });
            }
          });
        } else {
          return done(null, false, { message: 'Email or password is invalid.' })
        }
      }
    )
  }
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done (null, user.id));

  passport.deserializeUser((id, done) => {
    pool.query(
      `SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
        if (err) {
          return done(err);
        }

        return done(null, results.rows[0]);

      }
    )
  });
}

module.exports = initialize;