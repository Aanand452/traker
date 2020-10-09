import fs from 'fs';
import parse from 'csv-parse';
import Region from '@sara/db/src/models/region';
import APM1 from '@sara/db/src/models/apm1';
import APM2 from '@sara/db/src/models/apm2';
import Industry from '@sara/db/src/models/industry';
import LifecycleStage from '@sara/db/src/models/lifecycleStage';
import Segment from '@sara/db/src/models/segment';
import Persona from '@sara/db/src/models/persona';
import Program from '@sara/db/src/models/program';
import currencyFormatter from 'currency-formatter';

var myArgs = process.argv.slice(2);
if(myArgs.length === 0) console.error('the path of the CSV is required as an argument');
else{
  console.log('Running Program upload on DB from', myArgs[0]);
  
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
    if(row[5]) {
      var regionId = await Region.getByName(row[5]);
      if(!regionId) {
        console.log("Region not identified: ", row[5]);
        return false;
      }
    }
    if(row[6]) {
      var lifecycleStageId = await LifecycleStage.getByName(row[6]);
      if(!lifecycleStageId) {
        console.log("lifecycle satge not identified: ", row[6]);
        return false;
      }
    }
    if(row[7]) {
      var apm1Id = await APM1.getByName(row[7]);
      if(!apm1Id) {
        console.log("apm1 not identified: ", row[7]);
        return false;
      }
    }
    if(row[8]) {
      var apm2Id = await APM2.getByName(row[8]);
      if(!apm2Id) {
        console.log("apm2 not identified: ", row[8]);
        return false;
      }
    }
    if(row[9]) {
      var industryId = await Industry.getByName(row[9]);
      if(!industryId) {
        console.log("industry not identified: ", row[9]);
        return false;
      }
    }
    if(row[10]) {
      var segmentId = await Segment.getByName(row[10]);
      if(!segmentId) {
        console.log("segment not identified: ", row[10]);
        return false;
      }
    }
    if(row[11]) {
      var personaId = await Persona.getByName(row[11]);
      if(!personaId) {
        console.log("persona not identified: ", row[11]);
        return false;
      }
    }
  
    const body = {
      name: row[0],
      owner: row[1],
      budget: row[2] ? currencyFormatter.unformat(row[2], { code: 'USD' }) : null,
      metrics: row[3] ? currencyFormatter.unformat(row[3], { code: 'USD' }) : null,
      otherKpis: row[4],
      regionId,
      lifecycleStageId,
      apm1Id,
      apm2Id,
      industryId,
      segmentId,
      personaId,
      customerMessage: row[12]
    };
    
    const program = await Program.addNewProgram(body);

    if(program === "Error" || !program) throw new Error("Error saving the program");
    else console.log('Program inserted: ', body.name);
  } catch(err){
    console.log('Program not inserted', err);
  }
  
}


