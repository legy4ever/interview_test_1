import { Response } from "express-serve-static-core"

export const messageSuccess2xx = (res: Response<any, Record<string, any>, number>, statusCode: number, message: any) => {
    res.status(statusCode)
    res.send(message)
    return res
}

export const messageError4xx = (res: Response<any, Record<string, any>, number>, statusCode: number, message: any) => {
    res.status(statusCode)
    res.send(message)
    return res
}