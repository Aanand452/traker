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
}

export default Segment;