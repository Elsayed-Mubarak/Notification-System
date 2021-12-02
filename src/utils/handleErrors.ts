import { ResponseCode } from "../models/enums/StatusCode";
export default function handleErrors(error) {
    const statusCode = error.statusCode ? error.statusCode : ResponseCode.SomethingWentWrong
    const message = error.message ? error.message : 'Internal_Server_Error'
    const status = error.status ? error.status : 'Server_Error'
    return { statusCode, status, message }
}
