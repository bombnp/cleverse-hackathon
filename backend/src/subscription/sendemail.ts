import axios from 'axios'
import { ONESIGNAL_APP_ID, ONESIGNAL_AUTH_TOKEN } from 'src/config'

export async function sendEmail(recipient: string[]) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: ONESIGNAL_AUTH_TOKEN,
    },
  }
  axios
    .post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: ONESIGNAL_APP_ID,
        email_from_name: 'HackatonA',
        email_from_address: 'hackaton_cleverse.a@outlook.com',
        email_subject: 'For test backend',
        email_body: '<h1>Hello!</h1>',
        include_email_tokens: recipient,
      },
      axiosConfig,
    )
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
