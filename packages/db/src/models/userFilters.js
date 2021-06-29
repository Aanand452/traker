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

}


export default UserFilterModel;