const uri = 'https://www.aurexaedge.com';
const localUrl = 'http://localhost:3000';

export const liveUrl = 'https://www.aurexaedge.com';

export const url = process.env.NODE_ENV === 'production' ? liveUrl : localUrl;
