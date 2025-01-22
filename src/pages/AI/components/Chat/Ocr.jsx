import React, { useState } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Ocr = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const [showFormatButton, setShowFormatButton] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setShowFormatButton(false); // Hide format button when a new image is uploaded
    };

    const handleExtractText = async () => {
        if (!image) {
            alert('Please upload an image first.');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            const { data: { text } } = await axios.post('backend/api/vision', formData);
            setExtractedText(text);
            setEditorState(EditorState.createWithText(text));
            setShowFormatButton(true); // Show format button after text is extracted
        } catch (error) {
            console.error('OpenAI Vision failed:', error);
            alert('Failed to extract text. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormat = async () => {
        if (!extractedText) {
            alert('No text to format.');
            return;
        }

        try {
            const { data: { formattedText } } = await axios.post('backend/api/format', { text: extractedText });
            setEditorState(EditorState.createWithText(formattedText));
        } catch (error) {
            console.error('Formatting failed:', error);
            alert('Failed to format text. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>OCR </h1>
            <div style={{ marginBottom: '20px' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button
                    onClick={handleExtractText}
                    disabled={isLoading}
                    style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {isLoading ? 'Extracting...' : 'Extract Text'}
                </button>
                {showFormatButton && (
                    <button
                        onClick={handleFormat}
                        style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Format Text
                    </button>
                )}
            </div>
            <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                />
            </div>
        </div>
    );
};

export default Ocr;