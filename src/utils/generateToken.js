const apiUrl = 'https://api.monnify.com/api/v1/auth/login/';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${process.env.MONNIFY_LOGIN_KEY}`,
};

const generateToken = async () => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  return { token: responseData.responseBody.accessToken };
};

export default generateToken;
