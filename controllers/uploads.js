const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid"); //generador de un identificador unico
const { actualizarImagen } = require("../helpers/actualizar-imagen");
//
const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  //validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo seleccionado",
    });
  }
  //validar tipo
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, ni un hospital, ni un usuario. (verifique tipo)",
    });
  }
  //]Procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split("."); //imgen.4.5.jpeg
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]; //la ultima posicion

  //validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif", "svg"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "Tipo de archivo no admitido",
    });
  }
  //Generar nombre de archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  //path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  // mover la imagen
  file.mv(path, function (err) {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen " + err,
      });
    }

    res.json({
      ok: true,
      msg: "Archivo Cargado",
      nombreArchivo,
    });

    //actualizar BD
    actualizarImagen(tipo, id, nombreArchivo);
    //
  });
};

const retornaImagen = (req, res = response) => {
  //
  const tipo = req.params.tipo;
  const foto = req.params.foto;
  //
  let pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  if (!fs.existsSync(pathImagen)) {
    pathImagen = path.join(__dirname, `../uploads/no-img.jpg`);
  }
  res.sendFile(pathImagen);
  //
};

module.exports = {
  fileUpload,
  retornaImagen,
};
