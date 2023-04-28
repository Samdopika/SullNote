import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.h1`
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  margin: 0;
  width: 100%;
  text-align: center;
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #2980b9;
  }
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSave = (updatedNote) => {
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      const newNotes = [...notes];
      newNotes[index] = updatedNote;
      setNotes(newNotes);
    } else {
      setNotes([...notes, { ...updatedNote, id: Date.now() }]);
    }
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  const handleNewNote = () => {
    setSelectedNote({
      id: '',
      title: '',
      content: '',
    });
  };



  
  return (
    <Container>
      <Header>SullDog's Note Taking App</Header>
      <Button onClick={handleNewNote}>New Note</Button>
      <EditorContainer>
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <NoteList notes={notes} onNoteClick={setSelectedNote} />
        )}
      </EditorContainer>
    </Container>
  );
};

export default App;
