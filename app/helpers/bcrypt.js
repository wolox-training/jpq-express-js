const bcrypt = require('bcryptjs');

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = {
  encryptPassword,
  checkPassword
};
