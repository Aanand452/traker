import fs from 'fs';
import parse from 'csv-parse';
import region from '@sara/db/src/models/region';
import format from '@sara/db/src/models/format';
import user from '@sara/db/src/models/user';
import activity from '@sara/db/src/models/activity';
import program from '@sara/db/src/models/program';

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
    let regionId = region.getByName(row[4]);
    let programId = program.etlGetProgramByName(row[9]);
    let formatId = format.etlGetFormatsByName(row[2]);
    let userId = user.getUserId(row[8]);

    let values = await Promise.all([regionId, programId, formatId, userId]);
  
    let body = {};
    body.regionId = values[0];
    body.programId = values[1];
    body.formatId = values[2];
    body.userId = values[3];
    body.title = row[0];
    body.campaignId = row[1]
    body.endDate = row[6]
    body.startDate = row[5]
    body.abstract = row[3]
    body.asset = row[7]
    body.tacticId = 'to be erased'
    
    activity.addNewActivity(body);
    console.log('activity added:', body.title );
  } catch(err){
    console.log('not inserted', body.name, err);
  }
  
}


