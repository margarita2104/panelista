import axios from 'axios'

const BASE_URL = (window.location.hostname === 'localhost')
        ? 'http://localhost:8000/backend/api'
        : 'http://165.227.169.118/backend/api'

export const AxiosPanelista = axios.create({
  baseURL: BASE_URL,
})

export const AxiosDocsBot = axios.create({
  baseURL: 'https://api.docsbot.ai',
  headers: {
    'Authorization': `Bearer 4c5d4ef120fac05b6b1e6c7e7d02f19600a9072dd7c0490280e188aeb9ec587a`,
    'Content-Type': 'application/json',
  }
});