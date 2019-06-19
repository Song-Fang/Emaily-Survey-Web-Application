if(process.env.NODE_ENV==='production'){
  //we are in production - return prod set of keys
  module.exports = require('./prod.js');
}
else{
  //we are in dev
  module.exports = require('./dev.js');
}
