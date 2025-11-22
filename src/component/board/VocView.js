import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Avatar, Stack, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import CommentModal from '../commentmodal';
import { request } from '../request';

function VocView() {
  const { vocId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const { userToken, userAccountname } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.38.225.120:8080/api/post/${vocId}`);
        setPost(response.data.response);
      } catch (error) {
        console.error("Error fetching the post data:", error);
      }
    };

    fetchData();
  }, [vocId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://3.38.225.120:8080/api/comment/${vocId}`);
        setComments(response.data.response);
      } catch (error) {
        console.error("Error fetching the comments:", error);
      }
    };

    fetchComments();
  }, [vocId]);

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await request(`http://3.38.225.120:8080/api/comment/${vocId}`, 'POST', { contents: newComment }, userToken);
      setComments([...comments, response]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding the comment:", error);
    }
  };

  const handleDeleteClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedCommentId(null);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card sx={{ height: '60vh', overflow: 'auto' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar src="/static/images/avatar/1.jpg" alt="Profile Picture" />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                {post.username}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h5" component="div" gutterBottom align="left">
            {post.title}
          </Typography>
          <Typography variant="body1" align="left">
            {post.contents}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="댓글을 입력하세요"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="error" onClick={handleAddComment}>
          댓글 작성
        </Button>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.author}
                secondary={comment.content}
              />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {showCommentModal && selectedCommentId && (
        <CommentModal
          onClose={closeCommentModal}
          commentId={selectedCommentId}
          commentList={comments}
          postId={vocId}
          commentAuthor={comments.find((comment) => comment.id === selectedCommentId)?.author}
          setCommentList={setComments}
          setCommentCnt={(cnt) => setComments((prev) => ({ ...prev, length: cnt }))}
        />
      )}
    </Box>
  );
}

export default VocView;
