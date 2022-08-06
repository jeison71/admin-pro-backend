const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  //
  const desde = Number(req.query.desde) || 0;
  //
  // console.log(desde);
  // const usuarios = await Usuario.find({}, "nombre email role google")
  //   .skip(desde)
  //   .limit(5);

  // const total = await Usuario.count();

  const [usuarios, total] = await Promise.all([
    Usuario.find().skip(desde).limit(5),
    Usuario.count(),
  ]);
  //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado
  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const crearUsuario = async (req, res = response) => {
  //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado

  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar usuario
    await usuario.save();

    //Geenrar webToken
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
    //
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado (POST)... revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  //TODO: validar token y  comprobar si es el usuario

  const uid = req.params.id;
  try {
    const usuarioBD = await Usuario.findById(uid);

    if (!usuarioBD) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    //actualizaciones
    //Desestructurar, mapeo todos los campos req.body menos password y google
    const { password, google, email, ...campos } = req.body;
    if (usuarioBD.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "El email ya esta registrado",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
    //
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado (PUT)... revisar logs",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioBD = await Usuario.findById(uid);

    if (!usuarioBD) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    const usuarioEliminado = await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario Eliminado :" + uid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado (Delete)... revisar logs",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
