import axios from 'axios'
import { ONESIGNAL_APP_ID, ONESIGNAL_AUTH_TOKEN } from 'src/config'
import { HospitelDocument } from '../hospitel/schema'

export async function sendEmail(
  recipient: string[],
  hospitel: HospitelDocument,
) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: ONESIGNAL_AUTH_TOKEN,
    },
  }

  let phoneNumber = ''
  let i = 0
  for (const p of hospitel.contact.phone) {
    phoneNumber = phoneNumber + p
    if (i != hospitel.contact.phone.length - 1) {
      phoneNumber = phoneNumber + ' , '
    }
    i++
  }
  axios
    .post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: ONESIGNAL_APP_ID,
        email_from_name: 'BedHub',
        email_from_address: 'bedhub.h@outlook.com',
        email_subject: '**มี Hospitel ว่างแล้วในพื้นที่ของคุณ**',
        email_body:
          '<p><b>สถานที่</b><br>' +
          hospitel.name +
          '<br>เบอร์ติดต่อ: ' +
          phoneNumber +
          '<br>ดูข้อมูลเพิ่มเติมได้ที่:  </p>' +
          '<p>ถ้าหากมี Hospitel ใกล้เคียงที่มีห้องว่างเพิ่มขึ้น ทางทีมงานของเราจะแจ้งให้คุณทราบในทันที</p>' +
          '<p>ทีมงาน BedHub</p>',
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
