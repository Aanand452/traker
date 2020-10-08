import Format from '../dbmodels/format';

class FormatModel {
  static async getAllFormats() {
    try {
      const format = await Format.findAll({
        attributes: ['format_id', 'name'],
        order: [
          ['name', 'ASC'],
        ]
      });
      return format;
    } catch (err) {
      console.error('Error getting format list', err);
      return 'error';
    }
  }

  static async getFormatsByTacticId(tactic_id) {
    try {
      const format = await Format.findAll({
        attributes: ['format_id', ['name', 'label']],
        where: { tactic_id }
      });
      return format;
    } catch (err) {
      console.error('Error getting format list', err);
      return 'error';
    }
  }

  static async etlGetFormatsByName(name) {
    try {
      const format = await Format.findAll({
        where: { name },
        raw: true
      });

      if(format.length > 0 ) return format[0].formatId;
      else return null;
    } catch (err) {
      console.error('Error getting format list', err);
      return 'error';
    }
  }
}

export default FormatModel;