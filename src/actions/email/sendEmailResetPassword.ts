import { Resend } from "resend";

import { getWebsiteUrl } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailResetPassword = async (email: string, token: string) => {
  const BASE_URL = getWebsiteUrl();
  const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
  const htmlTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Email</title>
    <style>
      /* Add your CSS styles here */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        max-width: 150px;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="/logo-light.png" alt="Your Logo" />
      </div>
      <div class="content">
        <h2>Reset Your Password</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Here's your token:</p>
        <p><strong>${resetUrl}</strong></p>
        <p>
          If you didn't request a password reset, you can safely ignore this
          email.
        </p>
      </div>
      <div class="footer">
        <p>Sent by Your Website. &copy; ${new Date().getFullYear()}</p>
      </div>
    </div>
  </body>
</html>
`;
  try {
    console.log(process.env.NODE_ENV);
    const { data, error } = await resend.emails.send({
      from: "Eliot Website <eliot-test.com>",
      to: [email],
      subject: "Reset your password",
      html: htmlTemplate,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
    return;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
