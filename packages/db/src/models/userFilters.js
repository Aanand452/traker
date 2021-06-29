import db from '../dbmodels';
import { v4 as uuidv4 } from 'uuid';


class UserFilterModel {
    static async getUserFilterByUserId(id) {
        try{
          const filters = await db.UserFilter.findAll({
            where: {
                user_id : id
            },
            attributes: ['user_filter_id', 'user_id', 'formats_selected', 'regions_selected', 'programs_selected'],
          });
    
          return filters;
        } catch (err) {
          console.error('Error getting User Filter list', err);
        }
    }
    
    static async addNewUserFilter(body) {
        try {
            body.userFilterId = uuidv4();
            if(!body.userFilterId) throw new Error("It was imposible to create a program");
            const userFiler = await db.UserFilter.create(body);

            return userFiler;
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    static async updateUserFilter(id, body) {
      try{
        await db.UserFilter.update(body, {
          where: {
            user_filter_id: id
          }
        });

        return await UserFilterModel.getUserFilterById(id)
      } catch (err) {
        console.error('Error updating the user filter', err);
        return 'error';
      }
    }

    static async getUserFilterById(id) {
      try {
        let userFiler = await db.UserFilter.findByPk(id, {
          raw : true,
        });
        return userFiler
      } catch (err) {
        console.error('Error getting the user filter', err);
        return 'error';
      }
    }


}

export default UserFilterModel;