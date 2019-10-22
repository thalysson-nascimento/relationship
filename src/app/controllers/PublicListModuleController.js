import PostModule from '../models/PostModule';
import User from '../models/User';

class PublicListModuleController {
  async index(req, res) {
    const postModule = await PostModule.findAll({
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
}

export default new PublicListModuleController();
