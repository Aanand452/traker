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
  //disable atuh middleware while the FE is done
  callback(null);
  if (token && token.indexOf("Bearer ") === 0) {
    await validateToken(token.split(' ')[1]) ? callback(null) : sendError(req);
  } else {
    sendError(req);
  }
}

const signIn = (user)  => {
  console.log(user);
}

export { verifyToken, signIn };