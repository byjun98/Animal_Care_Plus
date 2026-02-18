import axios from 'axios';

export const request = async (url, method, data, userToken) => {
  const options = {
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(options);
    if (!response.data.success) {
      // 오류 메시지가 'error' 객체 안에 있는 경우 그 값을 사용하고, 없다면 기본 메시지 제공
      throw new Error(response.data.error || 'Unknown error occurred.');
    }
    return response.data.response; // 'response' 필드 내의 데이터를 반환
  } catch (error) {
    // 서버 응답이 있을 경우 그 메시지를, 없는 경우 기본 메시지 사용
    const errorMessage = error.response ? (error.response.data.error || 'Network request failed.') : 'Network error occurred.';
    throw new Error(errorMessage);
  }
};
