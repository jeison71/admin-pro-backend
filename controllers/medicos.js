const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find({}, "nombre img")
    .populate("usuario", "nombre")
    .populate("hospital", "nombre");
  //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado
  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  //
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });
  //
  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      msg: "Medico Creado",
      medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error " + error,
    });
  }
  //
};

const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarMedico",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
