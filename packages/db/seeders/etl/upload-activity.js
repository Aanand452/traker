import fs from 'fs';
import parse from 'csv-parse';
import Region from '@sara/db/src/models/region';
import Format from '@sara/db/src/models/format';
import User from '@sara/db/src/models/user';
import Activity from '@sara/db/src/models/activity';
import Program from '@sara/db/src/models/program';
import moment from 'moment';

var myArgs = process.argv.slice(2);
if(myArgs.length === 0) console.error('the path of the CSV is required as an argument');
else{
  console.log('Running Program upload on DB from', myArgs[0]);
  
  fs.readFile(__dirname + '/csv/' + myArgs[0], function (err, fileData) {
    err && console.error(err);

    parse(fileData, {columns: false, trim: true}, function(err, rows) {
      err && console.error(err);
      rows = rows.slice(1);
      rows.forEach((row, index) => readAndInsertRow(row, index+2));
    })
  })
}

const parseDate = (date) => {
  return null;
}

const readAndInsertRow = async (row, index) => {
  try{
    const activityId = await Activity.ETLCheckActivityExists(row[0], row[3], row[7]);
    if(activityId){
      console.log(`\x1b[33m[${index}] Activity not inserted: already exists (${row[0]})\x1b[0m`);
      return false;
    }

    if(row[4]) {
      var regionId = await Region.getByName(row[4]);
      if(!regionId) {
        console.log(`\x1b[31m[${index}] Region not identified: ${row[4]}\x1b[0m`);
        regionId = null;
      }
    }

    if(row[9]) {
      var programId = await Program.etlGetProgramByName(row[9]);
      if(!programId) {
        console.log(`\x1b[31m[${index}] Program not identified: ${row[9]}\x1b[0m`);
        programId = null;
      }
    }

    if(row[2]) {
      var formatId = await Format.etlGetFormatsByName(row[2]);
      if(!formatId) {
        console.log(`\x1b[31m[${index}] Format not identified: ${row[2]}\x1b[0m`);
        formatId = null;
      }
    }

    if(row[8]) {
      var userId = await User.getUserId(row[8]);
      if(!userId) {
        console.log(`\x1b[31m[${index}] User not identified: ${row[8]}\x1b[0m`);
        userId = null;
      }
    }

    const body = {
      title: row[0],
      campaignId: row[1],
      formatId,
      abstract: row[3],
      regionId,
      startDate: parseDate(row[5]),
      endDate: parseDate(row[6]),
      asset: row[7],
      userId,
      programId
    };
    
    const activity = await Activity.addNewActivity(body);

    if(activity === "error" || !activity) throw new Error(`Error saving the activity`);
    else console.log(`\x1b[32m[${index}] Activity inserted: ${body.title}\x1b[0m`);
  } catch(err){
    console.error('Activity not inserted', err);
  } 
}
