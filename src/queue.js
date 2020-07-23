import 'dotenv/config';
import Queue from './lib/Queue';

/**
 * A aplicação não será executada no mesmo node, na mesma execução da aplicação
 * assim a fila não vai influenciar na performance da aplicação
 */
Queue.processQueue();
