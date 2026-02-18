package com.board.repository;

import com.board.entity.Board;
import com.board.entity.Comment;
import com.board.entity.Likes;
import com.board.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByBoardAndUser(Board board, User user);
    Optional<Likes> findByCommentAndUser(Comment comment, User user);

    void deleteAllByUser(User user);
}
