import React from 'react';
import styled from '@emotion/styled';

const NoteContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Note = ({ note, onClick }) => (
  <NoteContainer onClick={onClick}>
    <h3>{note.title}</h3>
    <p>{note.content.substring(0, 50)}...</p>
  </NoteContainer>
);

export default Note;
