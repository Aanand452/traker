import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class Segment {
  static async getAll() {
    try{
      const segments = await db.Segment.findAll();

      return segments;
    } catch (err) {
      console.error('Error getting segments', err);
      return 'error';
    }
  }

  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.Segment.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length === 1 ? response[0].dataValues.segmentId : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }

  static async addNew(body) {
    try{
      body.segmentId = uuidv4();
      if(!body.segmentId) throw new Error("It was imposible to create a segment due to an id error");

      const segment = await db.Segment.create(body);
      
      return segment;
    } catch (err) {
      console.error('Error creating segment', err);
      return 'error';
    }
  }
}

export default Segment;