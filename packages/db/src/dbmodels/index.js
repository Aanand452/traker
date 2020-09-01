import Activity from './activity';
import Format from './format';
import Program from './program';
import Tactic from './tactic';
import User from './user';

let db = {};


/**
 * 
 * TBD, Implement for logic to pull all models inside of this folder instead one by one
 * CHECK!! If new modes is added should be aggregated here
 */

db.Activity = Activity;
db.Format = Format;
db.Program = Program;
db.Tactic = Tactic;
db.User = User;

/**
 * 
 * Run associations
 */
Object.keys(db).forEach( nodeName => {
  db[nodeName].associate && db[nodeName].associate(db);
})

export default db;