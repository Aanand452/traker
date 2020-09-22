import db from '../dbmodels/';

class Persona {
  static async getAll() {
    try{
      const personas = await db.Persona.findAll();

      return personas;
    } catch (err) {
      console.error('Error getting personas', err);
      return 'error';
    }
  }
}

export default Persona;