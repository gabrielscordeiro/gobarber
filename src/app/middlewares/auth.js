import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ');//passa a vírgula antes para discartar a primeira posicão e pegar apenas o token

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);//é usado o parenteres pois o promisify retorna uma função
    req.userId = decoded.id;
    return next();

  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }

};
