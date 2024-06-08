
import { IncomingMessage, ServerResponse } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
    target: process.env.proxy_url,
    secure: false,
    pathRewrite: { "^/api/": "" },
});

export default function handler(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    proxy(req, res, (err) => {
        if (err) {
            throw err;
        }

        throw new Error("Proxy error");
    });
}

export const api = {
    externalResolver: true,
};