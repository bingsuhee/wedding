/**
 * Utility to load external scripts dynamically.
 * Useful for Map SDKs or other third-party libraries.
 */
export const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
};

export const loadKakaoMap = (apiKey) => {
  const url = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
  return loadScript(url).then(() => {
    return new Promise((resolve) => {
      window.kakao.maps.load(() => {
        resolve(window.kakao.maps);
      });
    });
  });
};
