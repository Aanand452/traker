import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class Industry {
  static async getAll() {
    try{
      const industries = await db.Industry.findAll();

      return industries;
    } catch (err) {
      console.error('Error getting industries', err);
      return 'error';
    }
  }

  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.Industry.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length > 0 ? response[0].dataValues.industryId : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }

  static async addNew(body) {
    try{
      body.industryId = uuidv4();
      if(!body.industryId) throw new Error("It was imposible to create a industry due to an id error");

      const industry = await db.Industry.create(body);
      
      return industry;
    } catch (err) {
      console.error('Error creating industry', err);
      return 'error';
    }
  }
}

export default Industry;