//contolado llamdo getTodo
const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res = response) => {
  //
  buscar = req.params.buscar;
  const regex = new RegExp(buscar, "i"); //hace que la busqueda sea insensible
  //   const usuarios = await Usuario.find({ nombre: regex });
  //   const medicos = await Medico.find({ nombre: regex });
  //   const hospitales = await Hospital.find({ nombre: regex });

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);
  //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado
  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  //
  tabla = req.params.tabla;
  buscar = req.params.buscar;
  console.log(tabla);
  const regex = new RegExp(buscar, "i"); //hace que la busqueda sea insensible
  let data = [];
  //
  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre")
        .populate("hospital", "nombre");
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre"
      );
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla debe ser usuarios/medicos/hospitales",
      });
  }

  res.json({
    ok: true,
    resultado: data,
  });
  //
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
