import { EXCHANGE_NAME, EXCHANGE_TYPE } from '@carry/constants';

export function getRmqConfig(): string {
  const user = process.env.RMQ_USER || '';
  const password = process.env.RMQ_PASSWORD || '';
  const host = process.env.RMQ_HOST || '';
  const port = process.env.RMQ_PORT || '';

  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getRmqExchanges() {
  return [
    {
      name: EXCHANGE_NAME.ORDER,
      type: EXCHANGE_TYPE.TOPIC,
      options: {
        durable: true,
      },
    },
  ];
}

export function getConnectionsOptions() {
  return { wait: false };
}
