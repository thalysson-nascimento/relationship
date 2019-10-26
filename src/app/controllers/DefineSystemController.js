import DefineSystem from '../models/DefineSystem';

class DefineSystemController {
  async store(req, res) {
    const { name_system, description } = req.body;

    const defineSystem = await DefineSystem.create({
      name_system,
      description,
      user_id: req.userId,
    });
    return res.json(defineSystem);
  }

  async index(req, res) {
    const defineSystem = await DefineSystem.findAll({
      where: { user_id: req.userId },
    });

    return res.json(defineSystem);
  }
}

export default new DefineSystemController();
