/*
   ruta: api/todo:busqueda
*/
const { Router } = require("express");
//const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");
//
const router = Router();

router.get("/:buscar", validarJWT, getTodo);
router.get("/coleccion/:tabla/:buscar", validarJWT, getDocumentosColeccion);

module.exports = router;
