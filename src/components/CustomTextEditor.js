// src/components/CustomTextEditor.js
import React from 'react';
import '../App.css'; // Ensure that App.css does not conflict with component styles

const CustomTextEditor = ({ editorState, setEditorState }) => {
  const handleSave = () => {
    console.log('Content saved:', editorState);
    alert('Content saved!');
  };

  const handleInsertVariable = () => {
    // Example: Insert a placeholder variable
    setEditorState(prev => prev + ' {{UserName}} ');
  };

  return (
    <div className="custom-text-editor">
      <textarea
        value={editorState}
        onChange={(e) => setEditorState(e.target.value)}
        placeholder="Compose your reply..."
        className="editor-textarea"
      />
      <div className="editor-buttons">
        <button onClick={handleSave} className="editor-btn">SAVE</button>
        <button onClick={handleInsertVariable} className="editor-btn">Variables</button>
      </div>
    </div>
  );
};

export default CustomTextEditor;
