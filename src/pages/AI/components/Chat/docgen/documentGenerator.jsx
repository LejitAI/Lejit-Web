import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const DocumentGenerator = ({ documentType, questions }) => {
  const [userInput, setUserInput] = useState({});
  const [formattedOutput, setFormattedOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize state dynamically based on questions
  React.useEffect(() => {
    const initialInput = {};
    questions.forEach((question) => {
      initialInput[question.key] = '';
    });
    setUserInput(initialInput);
  }, [questions]);

  // Handle input changes
  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // API call to generate the document
  const generateDocument = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://backend.lejit.ai/api/api/docgen/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_type: documentType,
          user_input: userInput,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormattedOutput(data.content); // Set the generated formatted output
      } else {
        console.error('Failed to generate document');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  // Save the document as a .docx file
  const saveAsDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: formattedOutput
            .split('\n') // Split the output into lines
            .map((line) =>
              new Paragraph({
                children: [new TextRun(line)], // Add each line as a paragraph
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

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Input Form */}
      <div style={{ flex: 1 }}>
        <h2>Document Generator</h2>

        {/* Scrollable Questions Section */}
        <div
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
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

        {/* Generate Button */}
        <button
          onClick={generateDocument}
          disabled={loading}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Generating...' : 'Generate Document'}
        </button>
      </div>

      {/* Editable Output */}
      <div
        style={{
          flex: 1,
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
          overflowY: 'auto',
          maxHeight: '500px',
        }}
      >
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
            backgroundColor: '#28A745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save as .docx
        </button>
      </div>
    </div>
  );
};

export default DocumentGenerator;
