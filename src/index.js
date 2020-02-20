const path = require('path');
// Third
require('dotenv').config();

// Local
const app = require('./server/server.config');
require('./database/database.config');

app.listen(app.get('port'), () => {
  console.log(`>> Server on port`, app.get('port'));
});
