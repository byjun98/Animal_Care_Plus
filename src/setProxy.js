import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};