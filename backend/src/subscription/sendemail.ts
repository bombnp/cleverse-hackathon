import axios from 'axios'

export async function sendEmail(recipient: [string]) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Basic NjgzMTNlYTYtOTU5MC00MzFlLWFmOGEtYTM2OTQxZTZkMmQ5',
    },
  }
  axios
    .post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: 'c55767fc-95ef-4e69-ac24-8303bc16ac9b',
        email_subject: 'test',
        email_body: '<h1>test</h1>',
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
