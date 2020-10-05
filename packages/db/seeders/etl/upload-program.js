import fs from 'fs';
import parse from 'csv-parse';
import region from '@sara/db/src/models/region';
import APM1 from '@sara/db/src/models/apm1';
import APM2 from '@sara/db/src/models/apm2';
import industry from '@sara/db/src/models/industry';
import LifecycleStage from '@sara/db/src/models/lifecycleStage';
import segment from '@sara/db/src/models/segment';
import persona from '@sara/db/src/models/persona';
import program from '@sara/db/src/models/program';
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
    let regionId = region.getByName(row[5]);
    let apm1Id = APM1.getByName(row[7]);
    let apm2Id = APM2.getByName(row[8]);
    let industryId = industry.getByName(row[9]);
    let lifecycleStageId = LifecycleStage.getByName(row[6]);
    let segmentId = segment.getByName(row[10]);
    let personaId = persona.getByName(row[11]);
    let message = row[12]
    let owner = row[1]
    let name = row[0]
    
    let values = await Promise.all([regionId, apm1Id, apm2Id, industryId, lifecycleStageId, segmentId, personaId])
  
    let body = {};
    body.targetRegion = values[0];
    body.apm1 = values[1];
    body.apm2 = values[2];
    body.industry = values[3];
    body.lifecycleStage = values[4];
    body.segment = values[5];
    body.persona = values[6];
    body.owner = owner;
    body.name = name;
    body.customerMessage = message;
    body.budget = row[2] ? currencyFormatter.unformat(row[2], { code: 'USD' }) : null;
    body.metrics =  row[3] ? currencyFormatter.unformat(row[3], { code: 'USD' }) : null;
    body.otherKPI = row[5];
    
    const prog = await program.etlAddNewProgram(body);
    console.log('inserted', body.name);
  } catch(err){
    console.log('not inserted', body.name, err);
  }
  
}


