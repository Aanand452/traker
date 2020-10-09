import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

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
  
  static async addNew(body) {
    try{
      body.personaId = uuidv4();
      if(!body.personaId) throw new Error("It was imposible to create a persona due to an id error");

      const persona = await db.Persona.create(body);
      
      return persona;
    } catch (err) {
      console.error('Error creating persona', err);
      return 'error';
    }
  }
}

export default Persona;