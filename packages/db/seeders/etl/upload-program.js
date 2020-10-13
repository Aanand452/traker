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
    const programId = await Program.etlGetProgramByName(row[0]);
    if(programId){
      console.log("\x1b[33mProgram not inserted: already exists (", row[0], ")\x1b[0m");
      return false;
    }

    if(row[5]) {
      var regionId = await Region.getByName(row[5]);
      if(!regionId) {
        console.log("\x1b[31mRegion not identified: ", row[5], "\x1b[0m");
        regionId = null;
      }
    }
    if(row[6]) {
      var lifecycleStageId = await LifecycleStage.getByName(row[6]);
      if(!lifecycleStageId) {
        console.log("\x1b[31mlifecycle stage not identified: ", row[6], "\x1b[0m");
        lifecycleStageId = null;
      }
    }
    if(row[7]) {
      var apm1Id = await APM1.getByName(row[7]);
      if(!apm1Id) {
        console.log("\x1b[31mapm1 not identified: ", row[7], "\x1b[0m");
        apm1Id = null;
      }
    }
    if(row[8]) {
      var apm2Id = await APM2.getByName(row[8]);
      if(!apm2Id) {
        console.log("\x1b[31mapm2 not identified: ", row[8], "\x1b[0m");
        apm2Id = null;
      }
    }
    if(row[9]) {
      var industryId = await Industry.getByName(row[9]);
      if(!industryId) {
        console.log("\x1b[31mindustry not identified: ", row[9], "\x1b[0m");
        industryId = null;
      }
    }
    if(row[10]) {
      var segmentId = await Segment.getByName(row[10]);
      if(!segmentId) {
        console.log("\x1b[31msegment not identified: ", row[10], "\x1b[0m");
        segmentId = null;
      }
    }
    if(row[11]) {
      var personaId = await Persona.getByName(row[11]);
      if(!personaId) {
        console.log("\x1b[31mpersona not identified: ", row[11], "\x1b[0m");
        personaId = null;
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
    else console.log("\x1b[32mProgram inserted: ", body.name, "\x1b[0m");
  } catch(err){
    console.log("Program not inserted", err);
  }
  
}


