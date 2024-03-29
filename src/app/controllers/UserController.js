import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'Usuário existente' });
    }
    const { id, name, email, admin } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return res.status(400).json({ error: 'Usuário existente' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Erro de autenticação' });
    }

    const { id, name, admin } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
