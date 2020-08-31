import Format from '../dbmodels/format';

class FormatModel {
  static async getAllFormats() {
    try {
      const format = await Format.findAll({});
        return format;
    } catch (err) {
      console.error('Error getting format list', err);
    }
  }
}

export default FormatModel;