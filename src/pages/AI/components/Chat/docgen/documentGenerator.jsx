import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const DocumentGenerator = ({ documentType, questions }) => {
  const [userInput, setUserInput] = useState({});
  const [formattedOutput, setFormattedOutput] = useState('');
  const [suggestions, setSuggestions] = useState(''); // New state for suggestions
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const initialInput = {};
    questions.forEach((question) => {
      initialInput[question.key] = '';
    });
    setUserInput(initialInput);
  }, [questions]);

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSuggestionsChange = (e) => {
    setSuggestions(e.target.value);
  };

  const generateDocument = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/api/docgen/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: documentType,
          answers: userInput,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormattedOutput(data.document);
      } else {
        console.error('Failed to generate document');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const saveAsDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: formattedOutput
            .split('\n')
            .map((line) =>
              new Paragraph({
                children: [new TextRun(line)],
              })
            ),
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GeneratedDocument.docx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const sendSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/api/docgen/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: documentType,
          modified_document: formattedOutput,
          suggestions,
        }),
      });

      if (response.ok) {
        console.log('Suggestions submitted successfully');
      } else {
        console.error('Failed to submit suggestions');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <h2>Document Generator</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <label>
                <strong>{question.text}</strong>
              </label>
              <textarea
                name={question.key}
                value={userInput[question.key]}
                onChange={(e) => handleInputChange(e, question.key)}
                rows={3}
                style={{ width: '100%', padding: '8px', marginTop: '8px' }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={generateDocument}
          disabled={loading}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#0f67fd',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Generating...' : 'GENERATE DOCUMENT'}
        </button>
      </div>

      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '10px', backgroundColor: '#f9f9f9', overflowY: 'auto', maxHeight: '500px' }}>
        <h3>Generated Document</h3>
        <textarea
          value={formattedOutput}
          onChange={(e) => setFormattedOutput(e.target.value)}
          rows={20}
          style={{
            width: '100%',
            height: '100%',
            padding: '8px',
            fontFamily: 'Courier, monospace',
            fontSize: '14px',
            border: 'none',
            resize: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
          }}
        />
        <button
          onClick={saveAsDocx}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#0f67fd',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Save as .docx
        </button>
        <h4 style={{ marginTop: '20px' }}>Submit Suggestions</h4>
        <textarea
          value={suggestions}
          onChange={handleSuggestionsChange}
          rows={5}
          style={{
            width: '100%',
            padding: '8px',
            fontFamily: 'Arial, sans-serif',
            marginTop: '10px',
            resize: 'none',
          }}
          placeholder="Enter your suggestions here..."
        />
        <button
          onClick={sendSuggestions}
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#0f67fd',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Submitting...' : 'Submit Suggestions'}
        </button>
      </div>
    </div>
  );
};

export default DocumentGenerator;
