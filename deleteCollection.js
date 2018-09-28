const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'shop'; // Database Name

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

    if (err) throw err; // if unable to connect
    const db = client.db(dbName); // ansluten
    const collectionName = "items";
    
        db.collection(collectionName).removeMany( (err, ok) => {
            if(err) throw err;
            console.log(`Alla documents in "${collectionName}" has now been deleted`);
            client.close();
        });

    console.log("Connected");

});




