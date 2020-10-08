import db from '../dbmodels/';

class RegionModel {
  static async getAllRegions() {
    try{
      const region = await db.Region.findAll({
        attributes: ['region_id', ['name', 'label']],
        order: [
          ['name', 'ASC'],
        ]
      });

      return region;
    } catch (err) {
      console.error('Error getting activity', err);
      return 'error';
    }
  }

  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.Region.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length === 1 ? response[0].dataValues.regionId : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }
}

export default RegionModel;