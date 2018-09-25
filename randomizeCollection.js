const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'shop'; // Database Name

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err; // if unable to connect
    const db = client.db(dbName); // ansluten
    const randomAmountOfTime = Math.floor(Math.random() * 100) + 20; //antalet dokument som ska skapas
    const collectionName = "items";
    let documentsToBeInserted = generateProduct(randomAmountOfTime);

    db.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log(`Collection created named "${collectionName}"`);

        db.collection(collectionName).insertMany(documentsToBeInserted, function(err, res) {
            if (err) throw err;
            console.log(`${randomAmountOfTime} documents added!`);
            client.close();
          });

      });

    console.log("Connected");

});


function generateProduct(random) {
    let itemCount = 0;
    let allItems = [];

    // _id, namn, pris och kategori. Fixa

    const color = ['red', 'blue', 'pink', "green", "orange", "yellow", "black", "white"]
    const material = ['wood', 'plastic', 'metal', "kryptonite", "silk", "paper", "flesh", "gold", "silver", "blood"];
    const thing = ['balloon', 'bicycle', 'hammer', 'wrench', "shotgun", "football", "chainsaw", "monstertruck", "volvo", "doll", "hat"];
    // const price = [99, 199, 299, 1999, 10, 25, 2500, 4999];
    

    function randomElement(list) {
        let r = Math.random() * list.length;
        return list[Math.floor(r)];
    }

    for (itemCount; random > itemCount; itemCount++) {
        let c = randomElement(color);
        let m = randomElement(material);
        let t = randomElement(thing);
        // let p = randomElement(price);
        const p = Math.floor(Math.random() * 10000) + 10;
        

        let newItem = {
            item: `${c} ${m} ${t}`,
            price: p
        }
        allItems.push(newItem);
        
    }
    return allItems

}

