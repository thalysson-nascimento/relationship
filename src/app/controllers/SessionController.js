import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'usuário não cadastrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Erro de autenticação' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Gerando assinatura do payload no https://www.md5online.org/ assinatura = feedbackAPI
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
