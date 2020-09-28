import db from '../dbmodels/';

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
}

export default Industry;