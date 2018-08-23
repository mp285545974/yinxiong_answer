import fetch from './ajax'

export const DEBUG = false                  // 是否开发模式
const HTTP_DEV = 'http://www.vr0101.com' // 测试地址

const HTTPS = 'http://www.vr0101.com' // 正式地址

const URLS = DEBUG ? HTTP_DEV : HTTPS
// const URLS = '/bx'
class XHR {
  // 获取题目
  getQs (json) {
    return fetch({
      url: `${URLS}/getQuestions`,
      body: json,
      type: 'GET'
    })
  }
  // 提交成绩
  submitAnswer(json) {
    return fetch({
      url: `${URLS}/submitAnswer`,
      body: json,
      type: 'POST'
    })
  }
  // 更新用户信息
  updateUser(json) {
    return fetch({
      url: `${URLS}/updateUser`,
      body: json,
      type: 'POST'
    })
  }

  // 获取用户信息
  getUser (json) {
    return fetch({
      url: `${URLS}/getUser`,
      body: json,
      type: 'GET'
    })
  }
     
  // addIntegral 添加积分
  addIntegral(json) {
    return fetch({
      url: `${URLS}/addIntegral`,
      body: json,
      type: 'POST'
    })
  }
  // getTop 获取排行榜
  getTop(json) {
    return fetch({
      url: `${URLS}/getTop`,
      body: json,
      type: 'GET'
    })
  }
  // getTop 获取日榜
  getDayRank(json) {
    return fetch({
      url: `${URLS}/getDayRank`,
      body: json,
      type: 'GET'
    })
  }
  // 获取微信sdk
  getWechat (json) {
    return fetch({
      url: `${URLS}/getsignature`,
      body: json,
      type: 'POST'
    })
  }
  


}
export default new XHR()
