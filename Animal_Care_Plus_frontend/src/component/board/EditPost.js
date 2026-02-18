import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getSinglePost, editPost } from '../api/post';
import { TextField, Button, Box, Typography } from '@mui/material';
import withNavigation from './withNavigation';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { accessToken, userAccountname } = useContext(AuthContext);
  const [post, setPost] = useState({ title: '', contents: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getSinglePost(postId, accessToken);
        setPost(response);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [postId, accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editPost(postId, accessToken, post.title, post.contents, userAccountname);
      if (response.status === 200) {
        navigate('/voc');
      } 
     } catch (error) {
      console.error('Failed to edit post:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>게시글 수정</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="제목"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="내용"
          name="contents"
          value={post.contents}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="error">등록하기</Button>
          <Button onClick={() => navigate(-1)} variant="outlined" color="secondary" sx={{ ml: 2 }}>취소</Button>
        </Box>
      </form>
    </Box>
  );
};

export default withNavigation(EditPost);
