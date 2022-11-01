import mailjet from 'node-mailjet'

import { MAILJET_APIKEY, MAILJET_SECRET } from './env'

const transporter = mailjet.apiConnect(MAILJET_APIKEY, MAILJET_SECRET)

export default transporter
