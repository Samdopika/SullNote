import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import html2pdf from 'html2pdf.js';

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: ${({ primary }) => (primary ? '#3498db' : '#ccc')};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#2980b9' : '#bbb')};
  }
`;

const DownloadButton = styled(Button)`
  background-color: #27ae60;

  &:hover {
    background-color: #219653;
  }
`;

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [localNote, setLocalNote] = useState(note);

  useEffect(() => {
    setLocalNote(note);
  }, [note]);

  const handleTitleChange = (e) => {
    setLocalNote({
      ...localNote,
      title: e.target.value,
    });
  };

  const handleContentChange = (e) => {
    setLocalNote({
      ...localNote,
      content: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(localNote);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDownloadPdf = () => {
    const noteElement = document.createElement('div');
    noteElement.innerHTML = `
      <h1>${localNote.title}</h1>
      <div>${localNote.content.replace(/\n/g, '<br>')}</div>
    `;

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${localNote.title || 'Untitled'}_note.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(noteElement).set(opt).save();
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Note Title"
        value={localNote.title}
        onChange={handleTitleChange}
      />
      <TextArea
        placeholder="Note Content"
        value={localNote.content}
        onChange={handleContentChange}
      />
      <div>
        <Button primary onClick={handleSave}>
          Save
        </Button>
        <DownloadButton onClick={handleDownloadPdf}>Download PDF</DownloadButton>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default NoteEditor;
