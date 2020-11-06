import Activity from './activity';
import Format from './format';
import Program from './program';
import Tactic from './tactic';
import User from './user';
import ProgramApm1 from './programApm1';
import ProgramApm2 from './programApm2';
import ProgramLifecycle from './programLifecycle';
import Region from './region';
import LifecycleStage from './lifecycleStage';
import APM1 from './apm1';
import APM2 from './apm2';
import Industry from './industry';
import Segment from './segment';
import Persona from './persona';

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
db.ProgramApm1 = ProgramApm1;
db.ProgramApm2 = ProgramApm2;
db.ProgramLifecycle = ProgramLifecycle;
db.Region = Region;
db.LifecycleStage = LifecycleStage;
db.APM1 = APM1;
db.APM2 = APM2;
db.Industry = Industry;
db.Segment = Segment;
db.Persona = Persona;

/**
 * 
 * Run associations
 */
Object.keys(db).forEach( nodeName => {
  db[nodeName].associate && db[nodeName].associate(db);
})

export default db;