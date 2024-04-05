import bcrypt from "bcryptjs";

// Creamos un password haseado
export const creaHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validamos el password con el hash
export const validPassword = (password, user) => bcrypt.compareSync(password, user.password);
