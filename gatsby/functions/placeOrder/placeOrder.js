const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `<div>
    <h2>Your recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
    ${order
      .map(
        (item) => `
            <li>
                <img src="${item.thumbnail}" alt="${item.name}"/>
                ${item.size} ${item.name} - ${item.price}
            </li>
            `
      )
      .join('')}
    </ul>
    <p>Your order total is <strong>${total}</strong> due at pickup</p>
    </div>
    `;

exports.handler = async (event, context) => {
  // validate data coming in is correct.
  const body = JSON.parse(event.body);

  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop deep bop zzzsstt good bye',
      }),
    };
  }

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops, you're missing the ${field} field!`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `why would you order nothing?!`,
      }),
    };
  }

  // send email.
  // send success or error message.

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  const info = await transporter.sendMail({
    from: '"Derrick\'s Slices" <pizza@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'Your pizza is here',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
