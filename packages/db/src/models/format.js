import Format from '../dbmodels/format';

class FormatModel {
  static async getAllFormats() {
    try {
      const format = await Format.findAll({
        attributes: ['format_id', ['name', 'label'], 'tactic_id']
      });
      return format;
    } catch (err) {
      console.error('Error getting format list', err);
    }
  }

  static async getFilteredFormats(tactic_id) {
    try {
      const format = await Format.findAll({
        attributes: ['format_id', ['name', 'label']],
        where: { tactic_id }
      });
      return format;
    } catch (err) {
      console.error('Error getting format list', err);
    }
  }
}

export default FormatModel;