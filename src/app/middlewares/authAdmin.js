import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'você não está logado' });
  }

  /**
   * Check user is admin
   */
  const checkUserAdmin = await User.findOne({
    where: { id: req.userId, admin: true },
  });

  if (!checkUserAdmin) {
    return res
      .status(401)
      .json({ error: 'Acesso restriro a usuários administradores' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token inválido' });
  }
};
