// Very small cookie helpers used by the booking page. These are simplistic and
// intended for local development only.
export const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

export const getCookie = (name: string) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=0; path=/';
};

export const setJSONCookie = (name: string, obj: any, days = 30) => setCookie(name, JSON.stringify(obj), days);
export const getJSONCookie = (name: string) => {
  try {
    const v = getCookie(name);
    return v ? JSON.parse(v) : null;
  } catch (e) { return null; }
};

export default { setCookie, getCookie, deleteCookie, setJSONCookie, getJSONCookie };
