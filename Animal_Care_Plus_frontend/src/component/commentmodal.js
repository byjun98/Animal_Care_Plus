import React, { useRef, useState, useContext, useEffect } from 'react';
import * as S from './Modal.style';
import { AuthContext } from './context/AuthContext';
import { deleteComment } from './comment';
import AlertModal from './AlertModal';

const CommentModal = ({ onClose, commentId, commentList, postId, commentAuthor, setCommentList, setCommentCnt }) => {
  const modalRef = useRef();
  const { userToken, userAccountname } = useContext(AuthContext);
  const [isLoginUser, setIsLoginUser] = useState(false);

  useEffect(() => {
    setIsLoginUser(userAccountname === commentAuthor);
  }, [userAccountname, commentAuthor]);

  const optionClick = async (option) => {
    if (option === '삭제') {
      await fetchDelete();
      setCommentList(commentList.filter((comment) => comment.id !== commentId));
      setCommentCnt((prev) => prev - 1);
      onClose();
    }
  };

  const fetchDelete = async () => {
    console.log('postId 값:', postId);
    console.log('commentId 값:', commentId);
    try {
      await deleteComment(postId, commentId, userToken);
    } catch (error) {
      console.log('댓글 삭제 오류:', error);
      return { success: false, error: '댓글 삭제 오류' };
    }
  };

  const clickOutside = (e) => {
    if (modalRef.current && modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <>
      <S.ModalBg ref={modalRef} onClick={clickOutside}>
        <S.Ul>
          {isLoginUser && (
            <S.Li>
              <button onClick={() => optionClick('삭제')}>삭제</button>
            </S.Li>
          )}
        </S.Ul>
      </S.ModalBg>
    </>
  );
};

export default CommentModal;
