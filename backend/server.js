const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const client = new OAuth2Client(clientId);

app.use(cors());

app.use(bodyParser.json());

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    console.log(payload);

    // You can perform further actions with the user information here, such as creating or updating a user in your database

    res.status(200).json({ message: 'Authentication successful', user: payload });
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



/* Example return

{
    iss: 'https://accounts.google.com',
    azp: '645614707739-l44gkfhs4jnuedmvu55fj7upd7t0qjs0.apps.googleusercontent.com',
    aud: '645614707739-l44gkfhs4jnuedmvu55fj7upd7t0qjs0.apps.googleusercontent.com',
    sub: '106263797281055297916',
    email: 'claywiemann@gmail.com',
    email_verified: true,
    nbf: 1720465068,
    name: 'Clayton Wiemann',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocLzEbiXZrjQKJgv-ZzDYb47fnWWHKPzAHocVBA3CqJftlXf2Q=s96-c',
    given_name: 'Clayton',
    family_name: 'Wiemann',
    iat: 1720465368,
    exp: 1720468968,
    jti: '8b2de48bbb12c779e43697b9cbc6cb7bcdbc7104'
}

I marked the information recieved back that may have use for the game with '!'

{
    iss: (Issuer) just google
    azp: (Authorized Party), clientId
    aud: (Audience), clientId
    sub: (Subject) a unique ID that google uses accross their users/systems
!   email: (Email)
!   email_verified: (Verified?)
    nbf: (Not Before) a unix timestamp that indicates when the token becomes valid
!   name: (Name)
!   picture: (Profile Picture)
    given_name: (First Name)
    family_name: (Last Name)
!   iat: (Issued At) a unix timestamp of when the token was issued 
!   exp: (Expiration Time) ^^^ unix timestamp
    jti: (JWT ID) prevents replay attacks
}
















*/