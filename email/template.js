/**
 * return full email body
 * @param {string} partialBody
 */
exports.emailBody = (partialBody) => {
	const body = `
    <!DOCTYPE html
          PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">

      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" />
          <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />

          <title>GetEquity</title>

          <style type="text/css">
              @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");

              a {
                  text-decoration: none;
              }

              @media screen and (max-width: 420px) {
                  table {
                      width: 100% !important;
                      padding: 15px !important;
                  }

                  .logo {
                      width: 123px !important;
                      height: 25px !important;
                  }

                  .logo-wrapper {
                      padding: 18px 0 !important;
                  }

                  .welcome {
                      font-size: 25px !important;
                  }

                  .content-body{
                      font-size: 16px !important;
                      line-height: 24px !important;
                  }
                  .confirm{
                      font-size: 16px !important;
                      line-height: 50px !important;
                  }
                  .code{
                      font-size: 30px !important;
                      padding-top: 6px !important;
                  }
                  .button-wrapper{
                      padding-top: 46px !important;
                  }
                  button{
                      font-size: 18px !important;
                      line-height: 27px !important;
                      padding: 15px 34px !important;
                  }
                  .warning{
                      padding-bottom: 10px !important;
                  }

                  .signature {
                      padding-top: 10px !important;
                  }

                  .point {
                      display: none;
                  }

                  .link {
                      display: block;
                      padding: 12px 0 !important;
                      border-bottom: 1px #c4c4c4 solid !important;
                  }

                  .line {
                      display: none !important;
                  }

                  span {
                      display: block !important;
                  }

                  .copy {
                      font-size: 16px !important;
                      line-height: 23px !important;
                  }
              }
          </style>
      </head>

      <body style="padding: 0 30; margin: 0" width="100%">
          <table border="0" bgcolor="#F5F8FA" cellpadding="0" cellspacing="0" style="
              margin: 0 auto;
              padding: 24px;
              font-family: 'Source Sans Pro', sans-serif;
              color: #5F5F5F;
            " width="600px;">
              ${partialBody}
              <tbody align="center" style="font-size: 14px; line-height: 37px" width="100%">
                  <tr>
                      <td style="padding: 33px 0 0; font-size: 14px;
      line-height: 20px;"> <strong><a style="padding-right:40px;  color: #234260;" class="link" href="https://www.getequity.io/faqs"
                                  target="_blank" rel="noopener noreferrer">FAQs</a></strong> <strong class="point"
                              style="font-size: 20px;">.</strong> </strong> <strong> <a class="link"
                                  style="padding-right:40px; padding-left:40px; color: #234260;" href="mailto:hello@getequity.io"
                                  target="_blank" rel="noopener noreferrer">CONTACT</a></strong> <strong class="point"
                              style="font-size: 20px;">.</strong> <strong> <a class="link"
                                  style="padding-left:30px; color: #234260;" href="https://www.getequity.io/about" target="_blank"
                                  rel="noopener noreferrer">ABOUT</a></strong> </td>
                  </tr>
                  <tr>
                      <td class="copy" style="padding: 35px 0 0; font-size: 14px; color: #979797;
      line-height: 26px;">Copyright © ${new Date().getFullYear()} GetEquity. All Rights Reserved. With love. 💖</td>
                  </tr>
                  <tr>
                      <td style=" color: #234260;"> <span>hello@getequity.io</span></td>
                  </tr>
                  <tr>
                      <td style="padding: 35px 0 10px 0; color: #234260;">
                          <a style="padding-right: 50px" href="http://"> <img src="https://res.cloudinary.com/djalafcj9/image/upload/v1599165618/get%20equity/icon-instagram_lzdqec.png" alt="instagram logo">
                          </a>
                          <a style="padding-right: 50px" href="http://"> <img src="https://res.cloudinary.com/djalafcj9/image/upload/v1599165617/get%20equity/icon-fb_hgeevi.png" alt="facebook logo"> </a>
                          <a href="http://"> <img src="https://res.cloudinary.com/djalafcj9/image/upload/v1599165618/get%20equity/icon-twitter_rkmn0k.png" alt="twitter logo"> </a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </body>

      </html>
      `
	return body
}

/**
 * Send a user token
 * @param {object} user
 * @param {string} token
 */
exports.sendUserToken = (user, token) => {
	if (!user || !token) {
		throw new error('sendUserToken params not set')
	}
	try {
		let username = user.fname ? user.fname : user.username
		username = username ? ` ${username}` : ''
		const partialBody = `
    <tbody class="content-body" align="center" style="background-color: #ffffff; font-size: 14px; line-height: 37px"
    width="100%">
    <tr>
        <td class="logo-wrapper" align="center" valign="top" style="padding: 27px 0">
            <img class="logo"
                src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto,q_auto/v1599131419/get%20equity/Logo_irlyk0.png"
                alt="GetEquity" width="194" height="41" style="display: block" />
        </td>
    </tr>
    <tr>
        <td class="confirm" style=" color: #979797; padding: 28px 0 0; font-size: 20px;
line-height: 40px;">
            Your confirmation code is
        </td>
    </tr>
    <tr>
        <td class="code" style="padding: 28px 0 0; color: #5F5F5F; font-weight: bold; font-size: 40px;
line-height: 50px;">
            ${token}
        </td>
    </tr>
    <tr>
      <td align="center" class="warning" style="color: #979797; padding-top: 60px; padding-bottom: 20px; padding-left: 30px; padding-right: 30px; font-size: 14px;
        line-height: 23px;">If you received this email by mistake, simply delete it. Not to worry! The account opened with
        this
        email is deactivated if it isn’t confirmed. </td>
    </tr>
        `
		const body = this.emailBody(partialBody)
		return body
	} catch (error) {
		console.log('Notifications email.js user: ', user)

		console.log(error)
	}
}

/**
 * Send exchange success message
 * @param {object} user
 * @param {string} token
 */
exports.sendExchangeSuccess = (user, data) => {
	if (!user || !data) {
		throw new error('sendUserToken params not set')
	}
	try {
		const type = data.type == 'buy' ? 'bought' : 'sold'
		let username = user.fname ? user.fname : user.username
		username = username ? ` ${username}` : ''
		const partialBody = `
        <thead>
            <tr>
                <th class="logo-wrapper" align="center" bgcolor="#102030" valign="top" style="padding: 27px 0">
                    <img class="logo"
                        src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto,q_auto/v1599131417/get%20equity/getequity_whzneb.png"
                        alt="GetEquity" width="194" height="41" style="display: block" />
                </th>
            </tr>
        </thead>
        <tbody class="content-body" style="background-color: #ffffff; font-size: 14px; line-height: 37px"
            width="100%">
            <tr align="center">
                <td align="center" class="welcome" style="
                padding-top: 42px;
                letter-spacing: -1.05px;
                font-size: 25px;
                line-height: 35px;
            " valign="top">
                    you ${type} ${data.amount} ${data.token.symbol}
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 33px 0 33px">
                    Hi <strong>${username}</strong>, 
                    <br/>
                    You have just ${type} ${data.amount} ${data.token.symbol} for ${data.price} USD.
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 33px 40px 33px">
                    you can view details of the transaction here.
                </td>
            </tr>
        </tbody>
            `
		const body = this.emailBody(partialBody)
		return body
	} catch (error) {
		console.log('Notifications email.js user: ', user)

		console.log(error)
	}
}

/**
 * send a user signup email
 * @param {object} user
 */
exports.sendUserSignupEmail = (user) => {
	try {
		if (!user) {
			throw new Error('sendUserSignupEmail params not set')
		}
		let username = user.fname ? user.fname : user.name
		username = username ? ` ${username}` : ''
		const partialBody = `
      <thead>
          <tr>
              <th class="logo-wrapper" align="center" bgcolor="#102030" valign="top" style="padding: 27px 0">
                  <img class="logo"
                      src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto,q_auto/v1599131417/get%20equity/getequity_whzneb.png"
                      alt="GetEquity" width="194" height="41" style="display: block" />
              </th>
          </tr>
      </thead>
      <tbody class="content-body" style="background-color: #ffffff; font-size: 14px; line-height: 37px"
          width="100%">
          <tr>
              <td align="center" class="welcome" style="
                    padding-top: 42px;
                    letter-spacing: -1.05px;
                    font-size: 25px;
                    line-height: 35px;
                    " 
                    valign="top">
                  Welcome to GetEquity
              </td>
          </tr>
          <tr>
              <td style="padding: 40px 33px 0 33px">
                  Hello <strong>${username}</strong>, 
                  <br/>
                  your account has been created successfully.
                  Please note that you can always change your password from your
                  dashboard.
              </td>
          </tr>
          <tr>
              <td style="padding: 40px 33px 40px 33px">
                  For further assistance, please reply this email directly. 
                  <br/>
                  Happy investing.
              </td>
          </tr>
      </tbody>
        `
		const body = this.emailBody(partialBody)
		return body
	} catch (error) {
		console.log(error)
	}
}

exports.sendWithdrawalNotification = (business, permission) => {
	if (!business) {
		throw new Error('Business details not set')
	}
	try {
		const partialBody = `
        <thead>
            <tr>
                <th class="logo-wrapper" align="center" bgcolor="#102030" valign="top" style="padding: 27px 0">
                    <img class="logo"
                        src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto,q_auto/v1599131417/get%20equity/getequity_whzneb.png"
                        alt="GetEquity" width="194" height="41" style="display: block" />
                </th>
            </tr>
        </thead>
        <tbody class="content-body" style="background-color: #ffffff; font-size: 14px; line-height: 37px"
            width="100%">
            <tr align="center">
                <td align="center" class="welcome" style="
                padding-top: 42px;
                letter-spacing: -1.05px;
                font-size: 25px;
                line-height: 35px;
            " valign="top">
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 33px 0 33px">
                    Hi <strong>${business.name}</strong>, 
                    <br/>
                    Your withdrawal request has being ${permission}.
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 33px 40px 33px">
                    you can view details of the transaction here.
                </td>
            </tr>
        </tbody>
            `
		const body = this.emailBody(partialBody)
		return body
	} catch (error) {
		console.log('Notifications withdrawal.js user: ', business)

		console.log(error)
	}
}

exports.updateWithdrawalStatus = (business, status) => {
	if (!business) {
		throw new Error('Business details not set')
	}
	try {
		const partialBody = `
        <thead>
            <tr>
                <th class="logo-wrapper" align="center" bgcolor="#102030" valign="top" style="padding: 27px 0">
                    <img class="logo"
                        src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto,q_auto/v1599131417/get%20equity/getequity_whzneb.png"
                        alt="GetEquity" width="194" height="41" style="display: block" />
                </th>
            </tr>
        </thead>
        <tbody class="content-body" style="background-color: #ffffff; font-size: 14px; line-height: 37px"
            width="100%">
            <tr align="center">
                <td align="center" class="welcome" style="
                padding-top: 42px;
                letter-spacing: -1.05px;
                font-size: 25px;
                line-height: 35px;
            " valign="top">
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 33px 0 33px">
                    Hi <strong>${business.name}</strong>, 
                    <br/>
                    Your withdrawal status has being ${status}.
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 33px 40px 33px">
                    you can view details of the transaction here.
                </td>
            </tr>
        </tbody>
            `
		const body = this.emailBody(partialBody)
		return body
	} catch (error) {
		console.log('Notifications withdrawal.js user: ', business)

		console.log(error)
	}
}
