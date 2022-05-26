import 'dotenv';

export const config = {
  firebaseConfig: {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    appId: import.meta.env.VITE_APP_ID
  }
};