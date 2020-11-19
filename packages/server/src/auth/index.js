import UserModel from '@sara/db/src/models/user';
import jwt from 'jsonwebtoken';

const sharedSecret = process.env.JWT_KEY || 'secret'

const sendError = (req) => {
  return req.res.status(403).json({message: 'Access Denied'});
}
/**
 * 
 * @param 
 * decodedToken = {
 *  user_id: id
 *  username: email
 * }
 */
const validateToken = async (tokenString) => {
  let decodedToken = jwt.verify(tokenString, sharedSecret)

  const userId = await UserModel.getUserByEmail(decodedToken.username);
  return userId && userId === decodedToken.user_id;
}

const verifyToken = async (req, authOrSecDef, token, callback)  => {
  if (token && token.indexOf("Bearer ") === 0) {
    await validateToken(token.split(' ')[1]) ? callback(null) : sendError(req);
  } else {
    sendError(req);
  }
}

const signIn = (info) => {
  const user = { user_id: info.userId, username: info.username };
  console.log(jwt.sign); 

  var token = jwt.sign(user, 'secret');
  console.log(token);
}

export { verifyToken, signIn };