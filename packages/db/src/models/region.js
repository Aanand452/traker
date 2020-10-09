import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

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

  static async addNew(body) {
    try{
      body.regionId = uuidv4();
      if(!body.regionId) throw new Error("It was imposible to create a region due to an id error");

      const region = await db.Region.create(body);
      
      return region;
    } catch (err) {
      console.error('Error creating region', err);
      return 'error';
    }
  }
}

export default RegionModel;