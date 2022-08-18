// Package Dependencies
const express = require('express')
const subscriber = require('./rabbitmq')
const { sendMail, sendText, config, handleSuccess } = require('./utils')

const app = express()

async function subscribe() {
	try {
		await subscriber.init(config.amqp_url)
	} catch (error) {
		console.log(
			'RabbitMQ subscriber connection unsuccessful, retry after 5 seconds.'
		)
		setTimeout(subscribe, 5000)
	}

	// Send User Signup Mail
	subscriber.consume(
		'notification.user.welcome.email',
		async (msg) => {
			try {
				const data = JSON.parse(msg.content.toString())
				const mailparams = {
					subject: data.subject,
					user: data.user,
					to: data.user.email,
				}
				await sendMail('signup', mailparams)
				subscriber.acknowledgeMessage(msg)
			} catch (error) {
				console.log('error sending getequity signup mail', error)
			}
		},
		3
	)

	// Send User Token Mail
	subscriber.consume(
		'notification.user.token.email',
		async (msg) => {
			try {
				const data = JSON.parse(msg.content.toString())
				const mailparams = {
					subject: data.subject,
					user: data.user,
					token: data.token,
					to: data.user.email,
				}
				await sendMail('token', mailparams)
				subscriber.acknowledgeMessage(msg)
			} catch (error) {
				console.log('error sending getequity token mail', error)
			}
		},
		3
	)

	subscriber.consume(
		'notification.user.token.text',
		async (msg) => {
			try {
				const data = JSON.parse(msg.content.toString())
				const mailparams = {
					token: data.token,
					user: data.user,
					to: data.user.phone,
				}
				await sendText('token', mailparams)
				subscriber.acknowledgeMessage(msg)
			} catch (error) {
				console.log('error sending getequity signup text', error)
			}
		},
		3
	)

	// Send User Token Mail
	subscriber.consume(
		'notification.user.exchange.email',
		async (msg) => {
			try {
				const data = JSON.parse(msg.content.toString())
				const mailparams = {
					subject: data.subject,
					user: data.user,
					token: data.token,
					amount: data.amount,
					price: data.price,
					type: data.type,
					to: data.user.email,
				}
				await sendMail('exchange', mailparams)
				subscriber.acknowledgeMessage(msg)
			} catch (error) {
				console.log('error sending getequity token mail', error)
			}
		},
		3
	)

	//handle withdrawal request
	subscriber.consume('notification.withdrawal.request', async (msg) => {
		try {
			// if (msg.fields.redelivered) {
			// 	subscriber.rejectMessage(msg, true)
			// }
			const data = JSON.parse(msg.content.toString())
			const mailParams = {
				subject: data.subject,
				business: data.business,
				permission: data.permission,
			}
			await sendMail('withdrawal', mailParams)
			subscriber.acknowledgeMessage(msg)
		} catch (error) {
			console.log('error sending withdrawal mail', error)
		}
	})

	//update withdrawal request status
	subscriber.consume('notification.withdrawal.request', async (msg) => {
		try {
			// if (msg.fields.redelivered) {
			// 	subscriber.rejectMessage(msg, true)
			// }
			const data = JSON.parse(msg.content.toString())
			const mailParams = {
				business: data.business,
        status: data.status
			}
			await sendMail('withdrawal-update', mailParams)
			subscriber.acknowledgeMessage(msg)
		} catch (error) {
			console.log('error sending withdrawal mail', error)
		}
	})
}

subscribe()

app.get('/', (req, res) =>
	handleSuccess(res, 200, null, 'Notification service up and running')
)

module.exports = app
