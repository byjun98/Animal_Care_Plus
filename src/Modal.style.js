// Modal.style.js
import styled from 'styled-components';

export const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Li = styled.li`
  margin-bottom: 10px;
`;

