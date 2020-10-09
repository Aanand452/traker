import Format from '../dbmodels/format';
import { v4 as uuidv4 } from 'uuid';

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

      //thrown an error or save into log file if the response.length = 0
      if(format.length > 0 ) return format[0].formatId;
      else return null;
    } catch (err) {
      console.error('Error getting format list', err);
      return 'error';
    }
  }

  static async addNew(body) {
    try{
      body.formatId = uuidv4();
      if(!body.formatId) throw new Error("It was imposible to create a format due to an id error");

      const format = await Format.create(body);
      
      return format;
    } catch (err) {
      console.error('Error creating format', err);
      return 'error';
    }
  }
}

export default FormatModel;