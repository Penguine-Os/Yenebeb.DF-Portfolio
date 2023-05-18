export interface Email {
  to: string | undefined,
  from: string | undefined,
  subject: string,
  text: string,
  html: string,
  reply_to: string

}
