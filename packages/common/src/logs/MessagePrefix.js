import emoji from 'node-emoji';

/**
 * 
 * emoji list https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json 
 */

const ERROR_PREFIX = emoji.emoji.rage + ' ERROR:';
const MESSAGE_PREFIX = emoji.emoji.eyes + ' MESSAGE:';

export { ERROR_PREFIX , MESSAGE_PREFIX};