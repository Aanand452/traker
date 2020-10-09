import fs from 'fs';
import parse from 'csv-parse';
import APM1 from '@sara/db/src/models/apm1';
import APM2 from '@sara/db/src/models/apm2';
import Industry from '@sara/db/src/models/industry';
import Lifecycle from '@sara/db/src/models/lifecycleStage';
import Persona from '@sara/db/src/models/persona';
import Region from '@sara/db/src/models/region';
import Segment from '@sara/db/src/models/segment';
import Format from '@sara/db/src/models/format';

var myArgs = process.argv.slice(2);
if(myArgs.length === 0) console.error('the path of the CSV is required as an argument');
else{
  console.log('Running User upload on DB from', myArgs[0]);
  
  fs.readFile(__dirname + '/csv/' + myArgs[0], function (err, fileData) {
    err && console.error(err);

    parse(fileData, {columns: false, trim: true}, function(err, rows) {
      err && console.error(err);
      rows = rows.slice(1);
      rows.forEach(readAndInsertRow);
    })
  })
}

const readAndInsertRow = async row => {
  try{
    const model = row[0];
    const body = {
      name: row[1]
    };
    
    switch (model) {
      case "apm1":
        const apm1 = await APM1.addNew(body);
        if(apm1 === 'error') throw new Error("Error saving the apm1");
        else console.log('APM1 inserted: ', body.name);
        break;
      case "apm2":
        const apm2 = await APM2.addNew(body);
        if(apm2 === 'error') throw new Error("Error saving the apm2");
        else console.log('APM2 inserted: ', body.name);
        break;
      case "industry":
        const industry = await Industry.addNew(body);
        if(industry === 'error') throw new Error("Error saving the industry");
        else console.log('Industry inserted: ', body.name);
        break;
      case "lifecycle":
        const lifecycle = await Lifecycle.addNew(body);
        if(lifecycle === 'error') throw new Error("Error saving the lifecycle");
        else console.log('Lifecycle Stage inserted: ', body.name);
        break;
      case "persona":
        const persona = await Persona.addNew(body);
        if(persona === 'error') throw new Error("Error saving the persona");
        else console.log('Persona inserted: ', body.name);
        break;
      case "region":
        const region = await Region.addNew(body);
        if(region === 'error') throw new Error("Error saving the region");
        else console.log('Region inserted: ', body.name);
        break;
      case "segment":
        const segment = await Segment.addNew(body);
        if(segment === 'error') throw new Error("Error saving the segment");
        else console.log('Segment inserted: ', body.name);
        break;
      case "format":
        const format = await Format.addNew(body);
        if(format === 'error') throw new Error("Error saving the format");
        else console.log('Format inserted: ', body.name);
        break;
      default:
        throw new Error("Model wasn't found");
        break;
    }
  } catch(err){
    console.log('Record not inserted: ', err);
  }
  
}


