const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  //
  try {
    const { email, name, picture } = await googleVerify(req.body.token);
    const usuarioBD = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioBD) {
      console.log("pass google verify no existe", email);
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      console.log("pass google verify si existe", usuarioBD.nombre);
      usuario = usuarioDB;
      usuario.google = true;
    }
    //Guardar usuario
    await usuario.save();

    //Generar Token
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
    console.log("token propio", token);
    //
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};
//
module.exports = {
  login,
  googleSignIn,
};
