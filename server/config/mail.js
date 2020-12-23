const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "9d5bb655fc05acc89014b67a8b6bee10-3e51f8d2-b3af4aee",
    domain: "sandboxb6d9091d4eea4984b808bebdb604f9dd.mailgun.org",
  },
};

const transport = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, comment, name) => {
  const mailOptions = {
    from: email,
    to: "bazaronline.afg@gmail.com",
    subject: "BazarOnline Feedback",
    text: comment,
  };

  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

module.exports = sendMail;
