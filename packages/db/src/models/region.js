import db from '../dbmodels/';

class RegionModel {
  static async getAllRegions() {
    try{
      const region = await db.Region.findAll({});

      return region;
    } catch (err) {
      console.error('Error getting activity', err);
      return 'error';
    }
  }
}

export default RegionModel;