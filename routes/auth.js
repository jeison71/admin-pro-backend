/*
    Ruta : /api/login

*/
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

router.post(
  "/",
  [
    check("email", "Email obligatorio ó email no valido").isEmail(),
    check("password", "password obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
