import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import HomePage from './components/HomePage';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


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

const NavIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  list-style: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 100;
`;


const DropdownItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NotesPage = () => {
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
    <>
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
    </>
  );
};

const App = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container>
      <Router>
        <Header>Note App</Header>
        <NavIcon onClick={toggleDropdown}>
          <i className="fas fa-bars"></i>
        </NavIcon>
        <DropdownMenu isOpen={isDropdownOpen}>
          <DropdownItem>
            <Link to="/" onClick={toggleDropdown}>
              Home
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/notes" onClick={toggleDropdown}>
              Notes
            </Link>
          </DropdownItem>
        </DropdownMenu>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;

