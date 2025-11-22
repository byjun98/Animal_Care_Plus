import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VocHeader from './VocHeader';
import PostModal from '../postmodal';
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Box,
  Fab,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

function parseCustomDate(dateString) {
  if (!dateString || dateString.length < 12) {
    return new Date(); // 날짜 값이 없거나 형식이 잘못된 경우 현재 날짜를 반환
  }

  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // JavaScript months are 0-11
  const day = parseInt(dateString.slice(6, 8), 10);
  const hour = parseInt(dateString.slice(8, 10), 10);
  const minute = parseInt(dateString.slice(10, 12), 10);

  return new Date(year, month, day, hour, minute);
}

function GetData({ handlePostClick, handleMenuClick, tabValue }) {
  const [data, setData] = useState([]);
  const [postContents, setPostContents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (tabValue === 0) {
        response = await axios.get('http://3.38.225.120:8080/api/posts');
      } else if (tabValue === 1) {
        response = await axios.get('http://3.38.225.120:8080/api/posts');
        response.data.response = response.data.response.filter(post => post.likeCount >= 10);
      } else if (tabValue === 2) {
        // Fetch 뉴스 data using Python script
        response = await axios.get('/path-to-news-data');
      } else if (tabValue === 3) {
        // Fetch 칼럼 data using Python script
        response = await axios.get('/path-to-column-data');
      }
      const sortedData = response.data.response.sort((a, b) => b.id - a.id);
      setData(sortedData);
    };
    fetchData();
  }, [tabValue]);

  useEffect(() => {
    const fetchContent = async (id) => {
      try {
        const response = await axios.get(`http://3.38.225.120:8080/api/post/${id}`);
        return response.data.response.content;
      } catch (error) {
        console.error(`Failed to fetch content for post ${id}`, error);
        return '';
      }
    };

    const loadContents = async () => {
      const contents = {};
      for (const voc of data) {
        contents[voc.id] = await fetchContent(voc.id);
      }
      setPostContents(contents);
    };

    if (data.length > 0) {
      loadContents();
    }
  }, [data]);

  return data.map((voc) => {
    const createDate = parseCustomDate(voc.createdAt);
    const formattedDate = isNaN(createDate) ? '방금 전' : formatDistanceToNow(createDate, { addSuffix: true, locale: ko });

    const contentPreview = postContents[voc.id] ? postContents[voc.id].split('\n')[0] : 'Loading...';

    return (
      <React.Fragment key={voc.id}>
        <ListItem>
          <ListItemButton onClick={() => handlePostClick(voc.id)}>
            <ListItemText
              primary={
                <Typography component="span" fontWeight="bold">
                  {voc.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.secondary">
                    {contentPreview}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography component="span" variant="body2" color="text.secondary">
                      {formattedDate}  ·  좋아요 {voc.likeCount}  · 댓글 {voc.commentCount}
                    </Typography>
                  </Box>
                </>
              }
            />
          </ListItemButton>
          <IconButton onClick={(e) => handleMenuClick(e, voc.id, voc.username)}>
            <MoreVertIcon />
          </IconButton>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });
}

function Voc() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostAuthor, setSelectedPostAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { userAccountname } = useContext(AuthContext);

  const handlePostClick = (postId) => {
    navigate(`/voc/${postId}`);
  };

  const handleMenuClick = (event, postId, postAuthor) => {
    event.stopPropagation();
    console.log(`Menu clicked for post: ${postId}, author: ${postAuthor}`);
    setSelectedPostId(postId);
    setSelectedPostAuthor(postAuthor);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log('Modal closed');
    setShowModal(false);
    setSelectedPostId(null);
    setSelectedPostAuthor(null);
  };

  const handleTabChange = (event, newValue) => {
    console.log(`Tab changed to: ${newValue}`);
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://3.38.225.120:8080/api/posts');
      setPosts(response.data.response);
    };
    fetchPosts();
  }, []);

  const items = GetData({ handlePostClick, handleMenuClick, tabValue });

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <VocHeader />
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="전체" />
        <Tab label="인기글" />
        <Tab label="뉴스" />
        <Tab label="칼럼" />
      </Tabs>
      <Card variant="outlined" sx={{ margin: 'auto', mt: 2, mb: 2, maxWidth: 500 }}>
        <List sx={{ py: 'var(--ListDivider-gap)' }}>
          {items}
        </List>
      </Card>
      {showModal && selectedPostId && (
        <PostModal
          onClose={closeModal}
          postId={selectedPostId}
          posts={posts}
          setPosts={setPosts}
          postAuthor={selectedPostAuthor}
          author={{ accountname: userAccountname }}
          pathname={window.location.pathname}
        />
      )}
      <Fab color="error" aria-label="add" sx={{ position: 'fixed', bottom: 70, right: 16 }} onClick={() => navigate('/Voc/question')}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Voc;
