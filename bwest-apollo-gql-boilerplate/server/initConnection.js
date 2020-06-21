import mongodao from './@lib/mongodao';

export default () => Promise.all([mongodao.init()]);
