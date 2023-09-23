import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

const HttpErrorMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 与后端约定的响应数据格式
interface ResponseStructure {
  data: any;
  code?: number;
  error?: string;
  message?: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 自定义 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { code, message } = res;
      if (code !== 200) {
        const error: any = new Error(message);
        error.name = 'BizError';
        error.info = { ...res };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          message.error(errorInfo?.message);
        }
      } else if (error.response) {
        // Axios 的错误
        const errorText = HttpErrorMessage[error.response?.status] || error.response.statusText;
        message.error(errorText);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('未接收到服务器响应！');
      } else {
        // 发送请求时出了点问题
        message.error('请求错误！');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 请求带上token
      const token = localStorage.getItem('token');
      const Authorization = `Bearer ${token}`;
      return { ...config, headers: { ...config.headers, Authorization } };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: ResponseStructure) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      if (data?.code !== 200) {
        message.error(data?.message || '请求失败！');
      }
      return response;
    },
  ],
};
