const path = require('path');
// Third
require('dotenv').config();

// Local
const app = require('./server/server.config');
require('./database/database.config');
console.log('static: ', app.get('static'));
app.listen(app.get('port'), () => {
  console.log(`>> Server on port`, app.get('port'));
});
