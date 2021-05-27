export function readUserFromCookie() {
  const parsedCookie = parseCookie();
  if (!parsedCookie || !parsedCookie['express:sess']) {
    return null;
  }
  const parsedSession = JSON.parse(atob(parsedCookie['express:sess']));
  return parsedSession.user || null;
}

export function clearCookies() {
  document.cookie = 'express:sess=; path=/';
  document.cookie = 'express:sess.sig=; path=/';
}

function parseCookie() {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {});
}
