import db from '../dbmodels/';

class Persona {
  static async getAll() {
    try{
      const personas = await db.Persona.findAll({
        order: [
          ['name', 'ASC'],
        ]
      });

      return personas;
    } catch (err) {
      console.error('Error getting personas', err);
      return 'error';
    }
  }

  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.Persona.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length === 1 ? response[0].dataValues.personaId : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }
  
}

export default Persona;