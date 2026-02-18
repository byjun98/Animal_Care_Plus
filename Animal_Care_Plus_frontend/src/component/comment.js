import { request } from './request';

// 댓글 삭제
export const deleteComment = async (postId, commentId, userToken) => {
  return await request(`post/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: userToken,
    },
  });
};