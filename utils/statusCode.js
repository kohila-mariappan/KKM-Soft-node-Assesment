const successResponse = (res, msg) => {
  const data = {
    status: 1,
    message: msg
  }
  return res.status(200).json(data)
}
const successResponseWithData = (res, msg, data) => {
  const datas = {
    status: 1,
    message: msg,
    data
  }
  res.status(200).json(datas)
}
const errorResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg
  }
  return res.status(500).json(data)
}
const notFoundResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg
  }
  return res.status(404).json(data)
}
const authorisationErrorReponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg
  }
  return res.status(401).json(data)
}
const badRequestResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg
  }
  return res.status(400).json(data)
}
const dataResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg
  }
  return res.status(409).json(data)
}

module.exports = {
  successResponse,
  successResponseWithData,
  errorResponse,
  notFoundResponse,
  authorisationErrorReponse,
  badRequestResponse,
  dataResponse
}
