import db from '../dbmodels/';

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
}

export default Segment;