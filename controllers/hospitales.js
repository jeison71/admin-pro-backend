const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre");
  //res.status(400)  puedo controlar el status de la peticion enviando el codigo apropiado
  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  //
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });
  //
  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      msg: "Hospitales Creado",
      hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error " + error,
    });
  }
  //
};

const actualizarHospital = async (req, res = response) => {
  //
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospitalDB = Hospital.findById(uid);
    //
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no existe: " + id,
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActulizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActulizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error de servidos Actualizando hospital" + error,
    });
  }
  //
};

const borrarHospital = async (req, res = response) => {
  const id = req.params.id;
  try {
    const hospitalDB = Hospital.findById(id);
    //
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no existe: " + id,
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital eliminado",
    });
    //
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error de servidos Borrando hospital" + error,
    });
  }
  //
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
