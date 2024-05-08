const SmsSendingStatusType = {
  WaitToSend: 0,
  Sending: 1,
  Success: 2,
  HttpRequestFailed: 3,
  NotEnoughCredit: 4,
  UnknownFailed: 5,
  SendFailed: 6
}
export default {
  SmsSendingStatusType
}
