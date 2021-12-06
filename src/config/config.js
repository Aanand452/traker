let API_URL;

const fetchAPIUrl = async () => {
  return new Promise(async (resolve, reject) => {
    try{
      let api = await fetch('/config');
      let response = await api.json();

      if(response.api) resolve(response.api);   
    } catch (err) {
      reject(err); 
    }
  })
};

async function getAPIUrl(){
  try{
    return API_URL = process.env.REACT_APP_BASE_API_URL;
    
  } catch(err) {
    console.error('SARA', err);
  }
}

export { getAPIUrl, API_URL };