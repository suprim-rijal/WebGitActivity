const jwt = require('jsonwebtoken');

const secretKey = 'yourSecretKey'; // In production, store this in a .env file!

// 1. Create and Sign a JWT
function createJWT() {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };
  
  // Sign the JWT (this generates the actual token string)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
  console.log('--- 1. Generated JWT ---');
  console.log(token, '\n');
  return token;
}

// 2. Verify a JWT
function verifyJWT(token) {
  console.log('--- 2. Verifying JWT ---');
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message, '\n');
    } else {
      console.log('JWT Verified. Decoded payload:', decoded, '\n');
    }
  });
}

// 3. Decode a JWT (No signature validation)
function decodeJWT(token) {
  console.log('--- 3. Decoding JWT (No verification) ---');
  const decoded = jwt.decode(token);
  console.log('Decoded payload:', decoded, '\n');
}

// Run the lab sequence
const myToken = createJWT();
verifyJWT(myToken);
decodeJWT(myToken);

// Test verification with a fake token
console.log('--- 4. Testing Bad Token ---');
verifyJWT('fake.token.string');