# cloudflare-bitnami-charts-proxy
把 https://charts.bitnami.com/bitnami/index.yaml 中返回内容中的 docker registry 地址替换为自建的 cloudflare docker 代理地址

## 使用方法
在 rancher 应用商店中添加 chart 仓库时填入地址：https://bitnami-charts.eastcoal.tech/bitnami/index.yaml