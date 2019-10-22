import CommentModule from '../models/CommentModule';
import PostModule from '../models/PostModule';
import User from '../models/User';

class CommentModuleController {
  async store(req, res) {
    const { comment, note, module_id } = req.body;

    const findModule = await PostModule.findByPk(module_id);

    if (findModule === null) {
      return res.status(404).json({ error: 'Modulo não encontrado' });
    }

    const commentModule = await CommentModule.create({
      user_id: req.userId,
      comment,
      note,
      module_id,
    });

    return res.json(commentModule);
  }

  async index(req, res) {
    const commentModule = await CommentModule.findAll({
      where: { user_id: req.userId },
      order: ['id'],
      attributes: ['id', 'comment', 'note', 'module_id', 'createdAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(commentModule);
  }
}

export default new CommentModuleController();
