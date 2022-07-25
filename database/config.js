const mongoose = require("mongoose");
require("dotenv").config();

//console.log(process.env);
//"mongodb+srv://mean_user:Kije0513*@micluster.mryl3.mongodb.net/hospitaldb",
//const url = "mongodb://127.0.0.1/hospitaldb";
const url = process.env.DB_CNN;

const dbConnection = () => {
  try {
    mongoose
      .connect(url)
      .then(() => {
        console.log("Conectado a Mongo");
        console.log("DB on Line");
      })
      .catch((e) => console.log("El error de conexion es: " + e));
    // mongoose.connect(url, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    //mongoose.connect("mongodb://localhost:27017/test");
  } catch (error) {
    console.log("error");
    throw new Error("Error a la hora de iniciar la base de datos. Ver logs");
  }
};

module.exports = {
  dbConnection,
};
