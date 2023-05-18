import {Handler} from '@netlify/functions'
import {ClientResponse} from '@sendgrid/mail';
import {Email} from '../../Models/Email';
import {ResultObject} from '../../Models/SendGrid/ResultObject';
import {SuccessObject} from '../../Models/SendGrid/SuccessObject';

const sgMail = require('@sendgrid/mail')
require('dotenv').config()

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    const response = {message: `${event.httpMethod} method not supported`}
    return {
      statusCode: 400,
      body: JSON.stringify(response),
    }
  }
    const requestBody : Email = JSON.parse(event.body!);
  let {SENDGRID_API_KEY} = process.env;
  sgMail.setApiKey(SENDGRID_API_KEY)

  try {
    const response: [ClientResponse, {}] = await sgMail.send(requestBody);
    const successResult: SuccessObject = JSON.parse(JSON.stringify(response[0]));

    const result: ResultObject = {
      code: successResult.statusCode,
      message: "Email Sent Successfully",
    };

    return {
      statusCode: result.code,
      body: result.message,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }



}


