import React, { useState } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../styles/Ocr.css"; // Import custom styles
import { ColorModeContext, useMode } from "../../../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "../../../lawfirm/global/Topbar";
import Sidebar from "../../../lawfirm/global/Sidebar";

const Ocr = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const [showFormatButton, setShowFormatButton] = useState(false);
    const [theme, colorMode] = useMode();

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
            setEditorState(EditorState.createWithContent(ContentState.createFromText(text)));
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
            setEditorState(EditorState.createWithContent(ContentState.createFromText(formattedText)));
        } catch (error) {
            console.error('Formatting failed:', error);
            alert('Failed to format text. Please try again.');
        }
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box display="flex" height="100vh" position="relative">
                    <Sidebar />
                    <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
                        <Topbar />
                        <Box component="main" flexGrow={1} p={2} overflow="auto">
                            <div className="ocr-container">
                                <h1 className="ocr-title">OCR Text Extraction</h1>
                                <div className="ocr-controls">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="ocr-file-input" />
                                    <button
                                        onClick={handleExtractText}
                                        disabled={isLoading}
                                        className="ocr-button extract-button"
                                    >
                                        {isLoading ? 'Extracting...' : 'Extract Text'}
                                    </button>
                                    {showFormatButton && (
                                        <button
                                            onClick={handleFormat}
                                            className="ocr-button format-button"
                                        >
                                            Format Text
                                        </button>
                                    )}
                                </div>
                                <div className="ocr-editor-container">
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={setEditorState}
                                        toolbar={{
                                            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                            inline: { inDropdown: false },
                                            list: { inDropdown: false },
                                            textAlign: { inDropdown: false },
                                            link: { inDropdown: false },
                                            history: { inDropdown: false },
                                        }}
                                    />
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Ocr;