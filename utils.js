const NotifmeSdk = require('notifme-sdk').default
const {
	sendExchangeSuccess,
	sendUserSignupEmail,
	sendUserToken,
	sendWithdrawalNotification,
	updateWithdrawalStatus,
} = require('./email/template')

exports.config = {
	host: '',
	amqp_url: '',
	port: '',
}

if (process.env.NODE_ENV === 'development') {
	this.config.host = `http://localhost:${process.env.PORT}/v1/`
	this.config.amqp_url = `${process.env.AMQP_URL}`
	this.config.port = `${process.env.PORT}`
} else if (process.env.NODE_ENV === 'ganache') {
	this.config.host = 'https://ba-notification-service.herokuapp.com/'
	this.config.amqp_url = `${process.env.AMQP_URL}`
	this.config.port = `${process.env.PORT}`
} else {
	this.config.host = 'https://ba-notification-service.herokuapp.com/'
	this.config.amqp_url = process.env.CLOUDAMQP_URL
		? `${process.env.CLOUDAMQP_URL}`
		: `${process.env.AMQP_URL}`
	this.config.port = `${process.env.PORT}`
}

let notifmeSdk
if (process.env.NODE_ENV === 'development') {
	notifmeSdk = new NotifmeSdk({
		useNotificationCatcher: true, 
		channels: {
			email: {
				providers: [
					{
						type: 'logger',
					},
				],
			},
		},
	})
} else {
	console.log('NOTIFME IS IN PRODUCTION!!!!!!')
	notifmeSdk = new NotifmeSdk({
		channels: {
			email: {
				// If "Provider1" fails, use "Provider2"
				multiProviderStrategy: 'fallback',
				providers: [
					{
						type: 'smtp',
						host: 'smtp.gmail.com',
						port: 465,
						service: 'Gmail',
						secure: true,
						auth: {
							user: `${process.env.MAIL_USER}`,
							pass: `${process.env.MAIL_PASS}`,
						},
					},
					{
						type: 'sendgrid',
						apiKey: `${process.env.SENDGRID_KEY}`,
					},
				],
			},
			sms: {
				// Use "Provider1" and "Provider2" in turns (and fallback if error)
				// multiProviderStrategy: 'roundrobin',
				providers: [
					{
						type: 'twilio',
						accountSid: `${process.env.TWILIO_SID}`,
						authToken: `${process.env.TWILIO_AUTH}`,
					},
				],
			},
			voice: {
				providers: [
					{
						type: 'twilio',
						accountSid: `${process.env.TWILIO_SID}`,
						authToken: `${process.env.TWILIO_AUTH}`,
					},
				],
			},
			push: {
				providers: [
					{
						type: 'fcm',
						id: `${process.env.FCM_APP_ID}`,
					},
				],
			},
		},
	})
}

exports.sendMail = async (format, data) => {
	if (!format || !data.to || !data) {
		HandleError('Not all parameters were sent')
	}
	const message = {
		from: 'GetEquity HQ <hello@getequity.io>',
		to: data.to,
		subject: data.subject,
		html: format,
	}
	switch (format) {
		case 'signup':
			message.subject = 'Welcome to GetEquity'
			message.html = sendUserSignupEmail(data.user)
			break
		case 'token':
			message.subject = 'Activate your account'
			message.html = sendUserToken(data.user, data.token)
			break
		case 'exchange':
			const action = data.type == 'buy' ? 'bought' : 'sold'
			message.subject = `You have ${action} ${data.amount} ${data.token.symbol} successfully`
			message.html = sendExchangeSuccess(data.user, data)
			break
		case 'withdrawal':
			message.subject = `Withdrawl request has been ${data.permission}`
			message.html = sendWithdrawalNotification(data.business, data.permission)
			break
		case 'withdrawal-update':
			message.subject = `Withdrawal request status has been ${data.status}`
			message.html = updateWithdrawalStatus(data.business, data.status)
			break
		default:
			throw new Error('Invalid format')
	}

	return notifmeSdk.send({ email: message })
}

exports.sendText = async (format, data) => {
	if (!format || !data.to || !data) {
		HandleError('Not all parameters were sent')
	}
	const message = {
		from: '',
		to: data.to,
		text: '',
	}
	if (data.channel == 'wa') {
		message.to = `whatsapp:${data.to}`
		message.from = `whatsapp:${from}`
	}

	switch (format) {
		case 'token':
			message.text = `Your confirmation code is ${token}`
			break
		default:
			throw new Error('Invalid format')
	}
	return notifmeSdk.send({ sms: message })
}

exports.sendPush = async (format, data) => {
	if (!format || !to || !data) {
		HandleError('Not all parameters were sent')
	}
	let action
	const message = {
		registrationToken: data.deviceID,
		title: '',
		body: '',
		icon: 'https://res.cloudinary.com/djalafcj9/image/upload/f_auto,q_auto/v1599131417/get%20equity/getequity_whzneb.png',
	}

	switch (format) {
		case 'token':
			message.title = `Confirm your account`
			message.body = `Your confirmation code is ${token}`
			break
		case 'exchange':
			action = data.type == 'buy' ? 'bought' : 'sold'
			message.title = 'Your transaction is successful'
			message.body = `You have just ${action} ${data.amount} ${data.token.symbol} for ${data.price} USD`
			break
		case 'transfer':
			action = data.type == 'send' ? 'sent' : 'received'
			message.title = 'New successful transaction'
			message.body = `You have just ${action} ${data.amount} ${data.token.symbol}`
			break
		default:
			throw new Error('Invalid format')
	}
	return notifmeSdk.send({ push: message })
}

function HandleError(error) {
	throw new Error(error)
}

exports.handleSuccess = (res, code, data, message) =>
	res.status(parseInt(code, 10)).json({
		status: 'success',
		message,
		data,
	})
