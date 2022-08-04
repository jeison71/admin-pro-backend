const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  //convertir en una promesa todo el codigo de generarJWT
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
