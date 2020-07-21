import BeeQueue from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * Para cada job é criada uma fila e dentro dessa fila é armazenado o bee que é
   * a instância que conecta com o Redis que consegue armazenar e recuperar
   * valores do banco de dados e também o handle que processa a fila, que recebe
   * as variáveis de dentro do contexto do e-mail(ex: appointment)
   */
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new BeeQueue(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  /**
   * Armazena o job dentro da fila
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();//toda vez que chama o Add ele vai colocar o job na fila do Redis em background
  }

  /**
   * Pega cada um dos jobs e processa em tempo real. Toda vez que é adicionado
   * um job dentro do Redis o processQueue processa o job em background
   */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed',this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err){
    console.log(`Queue: ${job.queue.name}: FAILED`, err)
  }
}

export default new Queue();
