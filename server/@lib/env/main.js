import readEnv from 'read-env';
const env = readEnv({ transformKey: 'uppercase' });

export default env;
