import bcrypt from 'bcryptjs';


// creamos un password haseado
exports.creaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))


//validamos el password con el hash
exports.validPassword = (password, user) => bcrypt.compareSync(password, user.password)