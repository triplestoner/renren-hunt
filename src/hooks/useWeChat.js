/**
 * useWeChat Hook
 * 提供微信JSSDK的React Hook封装
 */

import { useState, useEffect } from 'react';
import {
  initWeChatJSSDK,
  shareToWeChat,
  chooseImage,
  getLocation,
  scanQRCode,
  chooseWXPay,
  isWeChatBrowser,
  isWeChatMiniProgram,
} from '../utils/wechat';

export function useWeChat() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInWeChat, setIsInWeChat] = useState(false);
  const [isInMiniProgram, setIsInMiniProgram] = useState(false);

  useEffect(() => {
    setIsInWeChat(isWeChatBrowser());
    setIsInMiniProgram(isWeChatMiniProgram());

    if (isWeChatBrowser() || isWeChatMiniProgram()) {
      initWeChatJSSDK()
        .then(() => setReady(true))
        .catch((err) => {
          console.error('微信JSSDK初始化错误:', err);
          setError(err);
        });
    }
  }, []);

  const handleShare = async (options) => {
    if (!ready) {
      console.warn('微信JSSDK未就绪');
      return false;
    }
    return shareToWeChat(options);
  };

  const handleChooseImage = async (count = 1) => {
    if (!ready) {
      console.warn('微信JSSDK未就绪');
      return [];
    }
    setLoading(true);
    const result = await chooseImage(count);
    setLoading(false);
    return result;
  };

  const handleGetLocation = async () => {
    if (!ready) {
      console.warn('微信JSSDK未就绪');
      return null;
    }
    setLoading(true);
    const result = await getLocation();
    setLoading(false);
    return result;
  };

  const handleScanQRCode = async () => {
    if (!ready) {
      console.warn('微信JSSDK未就绪');
      return null;
    }
    setLoading(true);
    const result = await scanQRCode();
    setLoading(false);
    return result;
  };

  const handlePay = async (paymentInfo) => {
    if (!ready) {
      console.warn('微信JSSDK未就绪');
      return false;
    }
    setLoading(true);
    const result = await chooseWXPay(paymentInfo);
    setLoading(false);
    return result;
  };

  return {
    ready,
    loading,
    error,
    isInWeChat,
    isInMiniProgram,
    share: handleShare,
    chooseImage: handleChooseImage,
    getLocation: handleGetLocation,
    scanQRCode: handleScanQRCode,
    pay: handlePay,
  };
}