/*
    Ruta : /api/login

*/
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { login, googleSignIn, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/",
  [
    check("email", "Email obligatorio ó email no valido").isEmail(),
    check("password", "password obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "token de google obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
