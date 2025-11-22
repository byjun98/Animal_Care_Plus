import axios from 'axios';

// 요청을 보내는 함수
export const request = async (url, method, data, userToken) => {
  try {
    const options = {
      method: method,
      data: data,
      headers: {
        Authorization: userToken
      }
    };
    const response = await axios(url, options);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || '네트워크 요청 중 오류가 발생했습니다.');
  }
};
