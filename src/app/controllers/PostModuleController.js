import User from '../models/User';
import PostModule from '../models/PostModule';

class PostModuleController {
  async index(req, res) {
    /**
     * Check user is admin
     */
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res
        .status(401)
        .json({ error: 'Apenas usuários administradores podem criar modulos' });
    }

    const postModule = await PostModule.findAll({
      where: { user_id: req.userId },
      order: ['id'],
      attributes: ['id', 'name_module', 'description', 'user_id', 'createdAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(postModule);
  }

  async store(req, res) {
    const { name_module, description } = req.body;

    /**
     * Check user is admin
     */
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res
        .status(401)
        .json({ error: 'Apenas usuários administradores podem criar modulos' });
    }

    const postModule = await PostModule.create({
      user_id: req.userId,
      name_module,
      description,
    });

    return res.json(postModule);
  }
}

export default new PostModuleController();
