import { NextApiRequest, NextApiResponse } from "next"
import httpProxyMiddleware from "next-http-proxy-middleware"

export const config = {
    api: {
        externalResolver: true
    }
}

export default function handler (req:NextApiRequest, res:NextApiResponse) {
    httpProxyMiddleware(req, res, {
        target: process.env.API,
    })
}