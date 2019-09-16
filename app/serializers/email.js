const { createTransport } = require('nodemailer');
const { service, user, password } = require('../../config').common.email;
const logger = require('../logger');

const transporter = createTransport({
  service,
  auth: {
    user,
    pass: password
  }
});

exports.sendEmail = (emailTo, body, subject) =>
  transporter
    .sendMail({
      from: 'No Reply Wolox <no-reply@wolox.co>',
      to: emailTo,
      subject,
      html: body
    })
    .then(result => logger.info(result.response))
    .catch(error => logger.error(error.message));
