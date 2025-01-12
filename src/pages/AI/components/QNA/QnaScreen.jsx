import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QnaScreen.css"; // Updated styling file

const QnaScreen = () => {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [sessionId] = useState(() => `qna_${Math.floor(Math.random() * 10000)}`);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("api/api/qna/get-qna-templates");
      setTemplates(response.data.available_qna_templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !documentType) {
      setUploadStatus("Please select a document type and a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    setUploadStatus("");

    try {
      await axios.post(
        `api/api/documents/upload?session_id=${sessionId}&document_type=${documentType}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Document uploaded successfully!");
    } catch (error) {
      setUploadStatus(
        `Upload failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleProcessQuestions = async () => {
    if (!selectedTemplate) {
      setUploadStatus("Please select a template.");
      return;
    }

    setIsProcessing(true);
    setResults(null);

    try {
      const response = await axios.post("api/api/qna/process-questions", {
        template_name: selectedTemplate,
        session_id: sessionId,
      });
      setResults(response.data.results);
    } catch (error) {
      console.error("Error processing questions:", error);
      setUploadStatus(
        `Processing failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="qna-screen-container">
      <div className={`qna-upload-section ${results ? "split-layout" : ""}`}>
        <div className="qna-upload-container">
          <h1>Smart Q&A Processor</h1>

          <div className="qna-form-group">
            <label htmlFor="qna-documentType">Select Document Type:</label>
            <select
              id="qna-documentType"
              value={documentType}
              onChange={handleDocumentTypeChange}
            >
              <option value="">-- Select Document Type --</option>
              <option value="Contract">Contract</option>
              <option value="Invoice">Invoice</option>
            </select>
          </div>

          <div className="qna-form-group">
            <label htmlFor="qna-fileInput">Choose File:</label>
            <input id="qna-fileInput" type="file" onChange={handleFileChange} />
          </div>

          <button
            onClick={handleUpload}
            className="qna-upload-button"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>

          {uploadStatus && <p className="qna-status-message">{uploadStatus}</p>}

          {templates.length > 0 && (
            <div className="qna-form-group">
              <label htmlFor="qna-templateSelect">Select QnA Template:</label>
              <select
                id="qna-templateSelect"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option value="">-- Select Template --</option>
                {templates.map((template) => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>

              <button
                onClick={handleProcessQuestions}
                className="qna-process-button"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Questions"}
              </button>
            </div>
          )}
        </div>

        {results && (
          <div className="qna-results-container">
            <h2>Q&A Results</h2>
            <ul>
              {Object.entries(results).map(([question, answer]) => (
                <li key={question}>
                  <strong>{question}</strong>
                  <p>{answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnaScreen;
