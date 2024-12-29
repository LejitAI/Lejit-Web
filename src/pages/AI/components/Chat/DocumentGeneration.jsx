import React, { useState, useEffect } from "react";
import "./DocumentGeneration.css";

const DocumentGeneration = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/api/docgen/get-available-templates");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTemplates(data.templates || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
        alert("Failed to load templates. Please try again.");
      }
    };
    fetchTemplates();
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData(template.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {}));
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/api/docgen/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_type: selectedTemplate.type,
          user_input: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedDocument(data);
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Failed to generate document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="document-generation">
      <h3>Document Generation</h3>
      {templates.length === 0 ? (
        <p>Loading templates...</p>
      ) : (
        <div className="templates-list">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`template-button ${selectedTemplate?.id === template.id ? "active" : ""}`}
            >
              {template.name}
            </button>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <div className="document-form">
          <h4>{selectedTemplate.name}</h4>
          {selectedTemplate.fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <input
                type="text"
                value={formData[field.name]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <button onClick={handleSubmit} className="generate-button" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Document"}
          </button>
        </div>
      )}

      {generatedDocument && (
        <div className="generated-document">
          <h4>Document Generated Successfully!</h4>
          <a href={generatedDocument.download_link} target="_blank" rel="noopener noreferrer">
            Download Document
          </a>
        </div>
      )}
    </div>
  );
};

export default DocumentGeneration;
