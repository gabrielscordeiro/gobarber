import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';
import * as Yup from 'yup';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { provider_id, date } = req.body;

    /**
     * verifica que se o provider_id é um provedor de serviços
     */

    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!isProvider) {
      return res.status(401).json({
        error: 'You can only create appointments with providers'
      });
    }

    //parseIso transforma a string de data em um objeto date do JS
    //startOfHour pega só a hora, zera os minutos
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted!' })
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        //canceled_at: null,
        date: hourStart
      }
    });

    console.log(provider_id);
    console.log(hourStart);


    if(checkAvailability){
      return res.status(400).json({ error: 'Appointment date is not available!' })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date
    });

    return res.status(200).json(appointment);
  }
}

export default new AppointmentController();
