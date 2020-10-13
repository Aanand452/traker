import fs from 'fs';
import parse from 'csv-parse';
import User from '@sara/db/src/models/user';

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
    const userExist = await User.getUserId(row[1]);
    if(userExist) {
      console.log('\x1b[33mUser not inserted: already exists (', row[1], ')\x1b[0m');
      return false;
    }

    const body = {
      username: row[0],
      name: row[1],
      password: row[2]
    };
    
    const user = await User.addNew(body);

    if(user === Error) {
      throw new Error("Error save the user");
    } else console.log('\x1b[32mUser inserted: ', body.name, '\x1b[0m');
  } catch(err){
    console.log('User not inserted: ', body.name, err);
  }
  
}


