import multer from "multer";
import __dirname from "../utils/utils.js";
import path from "path";

//configuracion de donde se guardaran los archivos:
const storage = multer.diskStorage({
  //destination hace referencia a la carpeta donde se guardara el archivo.
  destination: function (req, file, cb) {
    let path = __dirname + "/src/public/documents"; // Especificamos la ruta; Por defecto, guarda en 'documents'
    if (file.fieldname === "profile") path = __dirname + "/src/public/profiles";
    if (file.fieldname === "product") path = __dirname + "/src/public/products";
    cb(null, path);
  },
  //filename hace referencia al nombre final que tendra el archivo
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`); //elimina los espacios en blanco
  },
});

const upload = multer({ storage });
export default upload;
