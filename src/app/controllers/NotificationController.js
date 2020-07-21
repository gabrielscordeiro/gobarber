import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {


    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'Only providers can load notifications'
      });
    }

    const notifications = await Notification.find({
      user: req.userId
    }).sort({ createdAt: 'desc' }).limit(20);

    return res.status(200).json(notifications);
  }

  async update(req, res) {
    //const notification = await Notification.findById(req.params.id)
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true })//new:true retorna o novo registro atualizado

    return res.status(200).json(notification);
  }
}

export default new NotificationController();
