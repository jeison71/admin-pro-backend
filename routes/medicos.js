/*
Medicos
/api/medicos"
*/

const { Router } = require("express");
const { check } = require("express-validator"); //check es un middleware
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
} = require("../controllers/medicos");

const router = Router();

router.get("/", validarJWT, getMedicos);

//el sugundo parametro de esta ruta seria un unico middleware, si requiero llamar varios
//los envio dentro de llaves [mid1, midl2..etc]

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre medico es obligatorio").not().isEmpty(),
    check("hospital", "El id hospital debe ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre medico es obligatorio").not().isEmpty(),
    check("hospital", "El id hospital debe ser valido").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

router.delete("/:id", validarJWT, borrarMedico);

router.get("/:id", validarJWT, getMedicoById);

module.exports = router;
