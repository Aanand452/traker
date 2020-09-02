import Tactic from '../dbmodels/tactic';

class TacticModel {
  static async getAllTactics() {
    try {
      const tactic = await Tactic.findAll({attributes: ['tactic_id', ['name', 'label']]});
        return tactic;
    } catch (err) {
      console.error('Error getting tactic list', err)
    }
  }
}

export default TacticModel;