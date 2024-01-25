const mongoose = require('mongoose');
const dbName = 'CSV-Upload';

mongoose.connect(
  `mongodb+srv://CSV-Upload:W9bBOxihwLcKbpKE@cluster0.jyopjgi.mongodb.net/?retryWrites=true&w=majority`,
  { dbName, useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once('open', function(){
    console.log(`Database '${dbName}' connected to the server successfully!`);
});

module.exports = db;
