// Module will handle logs (save and view)

const colors = require('colors');
const fs = require('fs');
const moment = require('moment');
const url = require('url');

exports.error = (msg, req, method) => {
  const urldata = url.parse(req.url, true);
  console.log(`Error: ${msg}`.red);
  fs.appendFile('logs.txt', `Error: ${msg}.
  Faild Query Sring: ${urldata.pathname}
  method: ${method}
  Date and Time: ${moment().format()}
  
  `,function(err){
    if(err) throw err;
  });
};

exports.success = (msg, res, method, req) => {
  const urldata = url.parse(req.url, true);
  console.log(`Success: ${msg}`.green);
  fs.appendFile('logs.txt', `Success: ${msg}. 
  Success Query Sring: ${urldata.pathname}
  Response: ${JSON.stringify(res)}
  Method: ${method}
  Date and Time: ${moment().format()}
  
  `,function(err){
    if(err) throw err;
  });
};


exports.success1 = (msg, res, method) => {
  console.log(`Success: ${msg}`.green);
  fs.appendFile('logs.txt', `Success: ${msg}. 
  Response: ${JSON.stringify(res)}
  Method: ${method}
  Date and Time: ${moment().format()}
  
  `,function(err){
    if(err) throw err;
  });
};

exports.success2 = (msg, method, req) => {
  const urldata = url.parse(req.url, true);
  console.log(`Success: ${msg}`.green);
  fs.appendFile('logs.txt', `Success: ${msg}. 
  Success Query Sring: ${urldata.pathname}
  Method: ${method}
  Date and Time: ${moment().format()}
  
  `,function(err){
    if(err) throw err;
  });
};
