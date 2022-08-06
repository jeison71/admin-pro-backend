/*
Hospitales
/api/hospitales"
*/

const { Router } = require("express");
const { check } = require("express-validator"); //check es un middleware
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", getHospitales);

//el sugundo parametro de esta ruta seria un unico middleware, si requiero llamar varios
//los envio dentro de llaves [mid1, midl2..etc]

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre hospital es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

router.put("/:id", [], actualizarHospital);

router.delete("/:id", borrarHospital);

module.exports = router;
