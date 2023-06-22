const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  mongoClient
    .connect(
      "mongodb+srv://ritik28:neelam%402023@myfirstcluster.ri9d5sj.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((client) => {
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
