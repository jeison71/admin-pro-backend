const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  //leer el token, definido en los encabezados donde se llama el api
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    //
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid; //guardamos el dato en la request, para usarlo luego
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
