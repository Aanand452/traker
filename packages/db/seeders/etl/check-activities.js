import fs from 'fs';
import parse from 'csv-parse';
import Region from '@sara/db/src/models/region';
import Format from '@sara/db/src/models/format';
import User from '@sara/db/src/models/user';
import Program from '@sara/db/src/models/program';
import { createObjectCsvWriter } from 'csv-writer';
import moment from 'moment';

var myArgs = process.argv.slice(2);

if(myArgs.length === 0) console.error('the path of the CSV is required as an argument');
else{
  console.log('Running Program upload on DB from', myArgs[0]);
  
  fs.readFile(__dirname + '/csv/' + myArgs[0], (err, fileData) => {
    err && console.error(err);

    parse(fileData, {columns: false, trim: true}, async (err, rows) => {
      err && console.error(err);
      var row = rows.slice(1);
      var data = [];

      const csvWriter = createObjectCsvWriter({
        path: './seeders/etl/logs/errors.csv',
        header: [
          {id: 'field', title: 'Table_field'},
          {id: 'row', title: 'row_number_failed'},
          {id: 'value', title: 'value_failed'},
          {id: 'owner', title: 'activity_owner'},          
        ]
      });

      for(let i = 0; i < row.length; i++){
        
        try{
          if(row[i][4]) {
            var regionId = await Region.getByName(row[i][4]);
            if(!regionId) {
              data.push({
                field: 'Region',
                row: i+2,
                value: row[i][4],
                owner: row[i][8]
              })
            }
          }
      
          if(row[i][9]) {
            var programId = await Program.etlGetProgramByName(row[i][9]);
            if(!programId) {
              data.push({
                field: 'Program',
                row: i+2,
                value: row[i][9],
                owner: row[i][8]
              })
            }
          }
      
          if(row[i][2]) {
            var formatId = await Format.etlGetFormatsByName(row[i][2]);
            if(!formatId) {
              data.push({
                field: 'Format',
                row: i+2,
                value: row[i][2],
                owner: row[i][8]
              })
            }
          }

          if(row[i][8]) {
            var userId = await User.getUserId(row[i][8]);
            if(!userId) {
              data.push({
                field: 'User',
                row: i+2,
                value: row[i][8],
                owner: row[i][8]
              })
            }
          }
          

          if(row[i][5]) {
            var aDate = moment(row[i][5], 'dd/mm/yyyy');
            var valid = aDate.isValid();
            if(!valid || !row[i][5] ) {
              data.push({
                field: 'Start Date',
                row: i+2,
                value: row[i][5],
                owner: row[i][8]
              })
            }
          }

          if(row[i][6] || !row[i][6] ) {
            var aDate = moment(row[i][6], 'dd/mm/yyyy');
            var valid = aDate.isValid();
            if(!valid) {
              data.push({
                field: 'End Date',
                row: i+2,
                value: row[i][6],
                owner: row[i][8]
              })
            }
          }
        } catch(err){
          console.error('Error validating the data', err);
        } 
      }
      
      await csvWriter.writeRecords(data);
    })
  })
}

