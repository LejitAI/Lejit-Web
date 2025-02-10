import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../styles/Ocr.css";
import { ColorModeContext, useMode } from "../../../../theme";
import { CssBaseline, ThemeProvider, Box, CircularProgress } from "@mui/material";
import Topbar from "../../../lawfirm/global/Topbar";
import Sidebar from "../../../lawfirm/global/Sidebar";
import { useLocation } from 'react-router-dom';

const Ocr = ({ initialFile }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [file, setFile] = useState(initialFile || null);
    const [isLoading, setIsLoading] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const [showFormatButton, setShowFormatButton] = useState(false);
    const [theme, colorMode] = useMode();
    const location = useLocation();
    const fileUrl = location.state?.fileUrl;

    useEffect(() => {
        if (fileUrl) {
            fetchDocument(fileUrl);
        } else if (initialFile) {
            setFile(initialFile);
            handleExtractText(initialFile);
        }
    }, [fileUrl, initialFile]);

    const fetchDocument = async (url) => {
        try {
            const response = await axios.get(url, { responseType: 'blob' });
            setFile(response.data);
            handleExtractText(response.data);
        } catch (error) {
            console.error('Failed to fetch document:', error);
            alert('Failed to fetch document. Please try again.');
        }
    };

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setShowFormatButton(false);
    };

    const handleExtractText = async (fileToProcess = file) => {
        if (!fileToProcess) {
            alert('Please upload an image or document first.');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', fileToProcess);

        try {
            const { data: { text } } = await axios.post('backend/api/vision', formData);
            setExtractedText(text);
            setEditorState(EditorState.createWithContent(ContentState.createFromText(text)));
            setShowFormatButton(true);
        } catch (error) {
            console.error('OCR extraction failed:', error);
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
                                    <input type="file" accept="image/*, .pdf, .docx" onChange={handleFileUpload} className="ocr-file-input" />
                                    <button
                                        onClick={handleExtractText}
                                        disabled={isLoading}
                                        className="ocr-button extract-button"
                                    >
                                        {isLoading ? <CircularProgress size={24} /> : 'Extract Text'}
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
                                {isLoading && <div className="loading-overlay"><CircularProgress /></div>}
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