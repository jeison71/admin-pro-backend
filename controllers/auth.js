const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioBD = await Usuario.findOne({ email });

    //verifcar email
    if (!usuarioBD) {
      return res.status(400).json({
        ok: false,
        msg: "Email o contraseña no valido",
      });
    }

    //verifcar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioBD.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Email o contraseña no valido",
      });
    }

    //Geenrar webToken
    const token = await generarJWT(usuarioBD.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(5400).json({
      ok: false,
      msg: "Ocurrio un error inesperado (controlador/auth)",
    });
  }
};

module.exports = {
  login,
};
