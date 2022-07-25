require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

//crear el servidor de express
const app = express();

//configurar cors
app.use(cors());

//base de datos
dbConnection();

//BmteOfFQsT308xEc
//mean_user

//rutas
app.get("/", (req, res) => {
  //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor Corriendo en el puerto" + process.env.PORT);
});
