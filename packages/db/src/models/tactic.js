import Tactic from '../dbmodels/tactic';

class TacticModel {
  static async getAllTactics() {
    try {
      const tactic = await Tactic.findAll({});
        return tactic;
    } catch (err) {
      console.error('Error getting tactic list', err)
    }
  }
}

export default TacticModel;