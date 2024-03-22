const fs = require("node:fs");
const path = require("node:path");
const p = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // Error means file has no existing products
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

/* 
(1) fs.readFile will load the entire file into memory as you pointed out, while as fs.createReadStream will 
    read the file in chunks of the size you specify.
(2) The client will also start receiving data faster using fs.createReadStream as it is sent out in chunks as 
    it is being read, while as fs.readFile will read the entire file out and only then start sending it to the
    client. This might be negligible, but can make a difference if the file is very big and the disks are slow.
(3) Think about this though, if you run these two functions on a 100MB file, the first one will use 100MB 
    memory to load up the file while as the latter would only use at most 4KB.  
*/
