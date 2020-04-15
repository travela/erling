var argon2 = require('argon2');
var jwt = require('jsonwebtoken');
var userModel = require('../models/users');


class AuthService {


  async SignUp(email, password, name) {
    const passwordHashed = await argon2.hash(password);

    const userRecord = await userModel.create({
      password: passwordHashed,
      email : email,
      name : name,
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
    const signature = 'BruteForceWillNotHelpYou!§%3005';
    const expiration = '6h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
  }


}

module.exports = AuthService;