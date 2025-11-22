import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import withNavigation from './withNavigation';
import { useNavigate } from 'react-router-dom';

const VocQuestion = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const body = { title, contents };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    };

    try {
      const response = await axios.post('http://3.38.225.120:8080/api/post', body, { headers });
      console.log('status : ' + response.status);
      console.log('response data : ', response.data);
      if (response.status === 200) {
        navigate('/board');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data: ', error.response.data);
        console.error('Error response status: ', error.response.status);
        console.error('Error response headers: ', error.response.headers);
      } else if (error.request) {
        console.error('Error request: ', error.request);
      } else {
        console.error('Error message: ', error.message);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>게시글 작성</Typography>
      <form onSubmit={handleQuestionSubmit}>
        <TextField
          label="제목"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="내용"
          name="contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="error">등록</Button>
          <Button onClick={() => setTitle('') & setContents('')} variant="outlined" color="secondary" sx={{ ml: 2 }}>취소</Button>
        </Box>
      </form>
    </Box>
  );
};

export default withNavigation(VocQuestion);
