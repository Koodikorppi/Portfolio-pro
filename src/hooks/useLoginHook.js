import {useState, useCallback, useEffect} from 'react'

let logoutTimer;

export const useLoginHook = () => {
  const [token, setToken] = useState(false);
  const [url, setUrl] = useState("")
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, url, name, expdate) => {
    setUserId(uid);
    setToken(token);
    if(url === ""){
      setToken("https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/preview/" + name)
    } else {
      setUrl(url)
    }
    const tokenExpiration = expdate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, url: url, expiration: tokenExpiration.toISOString()}))
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
      login(storedData.userId, storedData.token, storedData.url, "", new Date(storedData.expiration));
    }
  }, [login]);

  return {token, userId, url, setUrl, login, logout, refreshToken}
}
