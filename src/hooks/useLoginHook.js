import {useState, useCallback, useEffect} from 'react'

let logoutTimer;

export const useLoginHook = () => {
  const [token, setToken] = useState(false);
  const [url, setUrl] = useState("")
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [publish, setPublish] = useState(false)

  const login = useCallback((uid, token, url, publish, expdate) => {
    setUserId(uid);
    setToken(token);
    setUrl(url)
    setPublish(publish)
    const tokenExpiration = expdate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, url: url, publish: publish, expiration: tokenExpiration.toISOString()}))
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, [])

  const refreshToken = useCallback(() => {
    if (token) {
    const tokenExpiration = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    }
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(()=> {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.url, storedData.publish, new Date(storedData.expiration));
    }
  }, [login]);

  return {token, userId, url, publish, setPublish, setUrl, login, logout, refreshToken}
}
