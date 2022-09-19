const { response } = require("express");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

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

const getMedicoById = async (req, res = response) => {

  const id = req.params.id;
  try {
      const medico = await Medico.findById(id)
                  .populate("usuario", "nombre img")
                  .populate("hospital", "nombre img");
      //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado
      res.json({
        ok: true,
        medico,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio buscando id medico " + error,
    });
  }
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
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error " + error,
    });
  }
  //
};

const actualizarMedico = async (req, res = response) => {
  //
  const uid = req.uid;
  const idMedico = req.params.id;
  const idHospital = req.body.hospital;

  //validar si el id medico existe
  const medicoDB = Medico.findById(idMedico);
  if (!medicoDB) {
    return res.status(400).json({
      ok: false,
      msg: "Medico no existe",
    });
  }
  //validar si el hospital existe
  if (!Hospital.findById(idHospital)) {
    return res.status(400).json({
      ok: false,
      msg: "Hospital asignado no existe",
    });
  }
  //
  const cambiosMedico = {
    ...req.body,
    usuario: uid,
  };

  const MedicoActulizado = await Medico.findByIdAndUpdate(
    idMedico,
    cambiosMedico,
    { new: true }
  );

  res.json({
    ok: true,
    medico: MedicoActulizado,
  });
};

const borrarMedico = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medicoDB = Medico.findById(id);
    //
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "Medico no existe: " + id,
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Medico eliminado",
    });
    //
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error de servidos Borrando medico, " + error,
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
};
