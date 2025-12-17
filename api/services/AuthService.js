var argon2 = require('argon2');
var jwt = require('jsonwebtoken');
var userModel = require('../models/users');


class AuthService {
  
  signature = 'BruteForceWillNotHelpYou!§%3005';

  async SignUp(email, password, name) {
    const passwordHashed = await argon2.hash(password);
    const userRecord = await userModel.create({
      password: passwordHashed,
      email : email,
      name : name,
}).catch((err) => {
  console.log("There was an error during Signup: ", err);
  // Check if it's actually a duplicate key error
  if (err.code === 11000) {
    throw new Error('User exists already');
  }
  throw new Error(`Signup failed: ${err.message}`);
});
    return {
      // MAKE SURE TO NEVER SEND BACK THE PASSWORD!!!!
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
    }
  }


async Login(name, password) {
    const userRecord = await userModel.findOne({ name });
    if (!userRecord) {
    throw new Error('User not found')
    } else {
    const correctPassword = await argon2.verify(userRecord.password, password);
    if (!correctPassword) {
        throw new Error('Incorrect password')
    }
    }

    return {
    user: {
        email: userRecord.email,
        name: userRecord.name,
    },
    token: this.generateToken(userRecord),
    }
}

  generateToken(user) {

    const data =  {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    const expiration = '6h';
    return jwt.sign({ data, }, this.signature, { expiresIn: expiration });
  }

}

module.exports = AuthService;
