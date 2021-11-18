import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import Persona from '@sara/db/src/models/persona'


const getAllPersonas = async (req, res) => {  
  try {
    const personas = await Persona.getAll();

    ApiUtils.reposeWithhSuccess(res, personas, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const addNewPersona = async (req, res) => {  
  try {
    const persona = await Persona.addNew(req.body);
    
    if(persona === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, persona, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllPersonas, addNewPersona }
