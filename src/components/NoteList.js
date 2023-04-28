import React from 'react';
import styled from '@emotion/styled';
import Note from './Note';

const NoteListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
`;

const NoteList = ({ notes, onNoteClick }) => (
  <NoteListContainer>
    {notes.map((note) => (
      <Note key={note.id} note={note} onClick={() => onNoteClick(note)} />
    ))}
  </NoteListContainer>
);

export default NoteList;
