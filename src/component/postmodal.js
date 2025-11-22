import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { deletePost } from './api/post';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';

const PostModal = ({ onClose, postId, posts, setPosts, postAuthor, author, pathname }) => {
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { accessToken, userAccountname } = useContext(AuthContext);
  const navigate = useNavigate();
  const myPostModalOptions = useMemo(() => ['삭제', '수정'], []);
  const otherPostModalOptions = useMemo(() => [], []);

  const isAuthor = author?.accountname === userAccountname;

  useEffect(() => {
    setIsLoginUser(userAccountname === postAuthor);
  }, [userAccountname, postAuthor]);

  const optionClick = (option) => {
    console.log(`Option clicked: ${option}`);
    if (option === '삭제') {
      setSelectedOption(option);
      closeModal('삭제'); // 삭제 옵션 클릭 시 바로 closeModal 호출
    } else if (option === '수정') {
      navigate(`/edit/${postId}`);
    }
  };

  const closeModal = async (option) => {
    console.log(`Close modal with option: ${option}`);
    if (option === '삭제') {
      await fetchDelete(postId, accessToken);
      setPosts(posts.filter((post) => post.id !== postId)); // 상태 업데이트
      if (pathname === `/vocview/${postId}`) {
        navigate(-1);
      }
      onClose();
    } else if (option === '취소') {
      setSelectedOption('');
      onClose();
    }
  };

  const fetchDelete = async (postId, accessToken) => {
    try {
      await deletePost(postId, accessToken);
      console.log(`Post ${postId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete post ${postId}:`, error);
    }
  };

  return (
    <Dialog open={true} onClose={() => closeModal('취소')}>
      <DialogTitle>게시글 옵션</DialogTitle>
      <DialogContent>
        <List>
          {isLoginUser || isAuthor
            ? myPostModalOptions.map((option, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => optionClick(option)}>
                    <ListItemText primary={option} />
                  </ListItemButton>
                </ListItem>
              ))
            : otherPostModalOptions.map((option, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => optionClick(option)}>
                    <ListItemText primary={option} />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal('취소')}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;
