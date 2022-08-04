/*
    Ruta : /api/usuarios

*/
const { Router } = require("express");
const { check } = require("express-validator"); //check es un middleware
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", validarJWT, getUsuarios);

//el sugundo parametro de esta ruta seria un unico middleware, si requiero llamar varios
//los envio dentro de llaves [mid1, midl2..etc]

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check(
      "email",
      "El email es obligatorio, o el formato debe contener @ sin caracters extraños"
    ).isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email obligatorio, debe contener @").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;
