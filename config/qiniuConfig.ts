export const getQiniuConfig = (): string => {
  const config = {
    // TODO HOST需要改成cdn域名
    DEV: '//{HOST}/front-end-cdn/static_dev',
    PROD: '//{HOST}/front-end-cdn/static'
  }

  return config[process.env.MODE]
}