import axios from 'axios';

const baseUrl = 'http://3.38.225.120:8080';

export const getSinglePost = async (postId, accessToken) => {
  const response = await axios.get(`${baseUrl}/api/post/${postId}`, {
    headers: { Authorization: accessToken },
  });
  return response.data;
};

export const editPost = async (postId, accessToken, title, contents, username) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/post/${postId}`,
      { title, contents, username },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API call error:', error.response.data);
      throw new Error(`API call failed with status ${error.response.status}: ${error.response.data}`);
    } else {
      console.error('Network or other error:', error.message);
      throw new Error('Network or other error: ' + error.message);
    }
  }
};

export const deletePost = async (postId, accessToken) => {
  try {
    console.log('Deleting post with ID:', postId);
    console.log('Authorization token:', accessToken);
    
    const response = await axios.delete(`${baseUrl}/api/post/${postId}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API call error:', error.response.data);
      throw new Error(`API call failed with status ${error.response.status}: ${error.response.data}`);
    } else {
      console.error('Network or other error:', error.message);
      throw new Error('Network or other error: ' + error.message);
    }
  }
};
