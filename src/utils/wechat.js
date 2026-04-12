/**
 * 微信JSSDK工具函数
 * 用于集成微信JSSDK，实现微信生态内的各种能力
 */

const wx = window.wx;

export async function initWeChatJSSDK() {
  if (typeof wx === 'undefined') {
    console.warn('微信JSSDK未加载');
    return false;
  }

  try {
    const response = await fetch('/api/wechat/jssdk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href.split('#')[0],
      }),
    });

    const data = await response.json();

    wx.config({
      debug: import.meta.env.DEV,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareWeibo',
        'onMenuShareQzone',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getLocalImgData',
        'startRecord',
        'stopRecord',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'getLocation',
        'openLocation',
        'scanQRCode',
        'chooseWXPay',
        'openBusinessLib',
      ],
    });

    return new Promise((resolve, reject) => {
      wx.ready(() => resolve(true));
      wx.error((err) => {
        console.error('微信JSSDK配置失败:', err);
        reject(err);
      });
    });
  } catch (error) {
    console.error('微信JSSDK初始化失败:', error);
    return false;
  }
}

export async function shareToWeChat(options) {
  if (typeof wx === 'undefined') return false;

  const { title, desc, link, imgUrl } = options;

  return new Promise((resolve) => {
    wx.onMenuShareTimeline({
      title,
      desc,
      link,
      imgUrl,
      success: () => resolve(true),
      fail: () => resolve(false),
    });

    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      success: () => resolve(true),
      fail: () => resolve(false),
    });
  });
}

export async function chooseImage(count = 1) {
  if (typeof wx === 'undefined') return [];

  return new Promise((resolve) => {
    wx.chooseImage({
      count,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => resolve(res.localIds),
      fail: () => resolve([]),
    });
  });
}

export async function getLocation() {
  if (typeof wx === 'undefined') return null;

  return new Promise((resolve) => {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => resolve(res),
      fail: () => resolve(null),
    });
  });
}

export async function scanQRCode() {
  if (typeof wx === 'undefined') return null;

  return new Promise((resolve) => {
    wx.scanQRCode({
      needResult: 1,
      scanType: ['qrCode', 'barCode'],
      success: (res) => resolve(res.resultStr),
      fail: () => resolve(null),
    });
  });
}

export async function chooseWXPay(paymentInfo) {
  if (typeof wx === 'undefined') return false;

  return new Promise((resolve) => {
    wx.chooseWXPay({
      timestamp: paymentInfo.timestamp,
      nonceStr: paymentInfo.nonceStr,
      package: paymentInfo.package,
      signType: 'MD5',
      paySign: paymentInfo.paySign,
      success: () => resolve(true),
      fail: () => resolve(false),
    });
  });
}

export function isWeChatBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

export function isWeChatMiniProgram() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('miniprogram');
}