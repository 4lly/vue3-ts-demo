import axios from "@/utils/request";

/**
 * @desc post请求
 * @param url 请求路径
 * @param parameter 请求参数
 *  */
export function postAction(url: string, parameter: any) {
  return axios({
    url: url,
    method: "post",
    data: parameter,
  });
}

/**
 * @desc http请求
 * @param url 请求路径
 * @param parameter 请求参数
 * @param method= {post | put}
 *  */
export function httpAction(url: string, parameter: any, method: any) {
  return axios({
    url: url,
    method: method,
    data: parameter,
  });
}

/**
 * @desc put请求
 * @param url 请求路径
 * @param parameter 请求参数
 *  */
export function putAction(url: string, parameter: any) {
  return axios({
    url: url,
    method: "put",
    data: parameter,
  });
}

/**
 * @desc get请求
 * @param url 请求路径
 * @param parameter 请求参数
 *  */
export function getAction(url: string, parameter: any) {
  return axios({
    url: url,
    method: "get",
    params: parameter,
  });
}

/**
 * @desc delete请求
 * @param url 请求路径
 * @param parameter 请求参数
 *  */
export function deleteAction(url: string, parameter: any) {
  return axios({
    url: url,
    method: "delete",
    params: parameter,
  });
}
