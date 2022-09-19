/*
   ruta: api/uploads
*/
const { Router } = require("express");
const expressFileUpload = require("express-fileupload"); //para tratamineto de subir imagenes

const { fileUpload, retornaImagen } = require("../controllers/uploads");
//const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");

//const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");
//
const router = Router();

// default options
router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);
router.get("/:tipo/:foto", retornaImagen);

module.exports = router;
