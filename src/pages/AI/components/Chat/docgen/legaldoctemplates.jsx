import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentGenerator from './documentGenerator';

const LegalDocumentTemplates = () => {
  const categories = [
    "All Templates",
    "Agreements",
    "Clauses",
    "Company Secretary",
    "Emails",
    "General",
    "Legal Research",
    "Letters",
  ];

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: '', description: '', files: null });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.post('http://backend.lejit.ai/api/api/docgen/get-available-templates');
        const availableTemplates = response.data.available_templates;

        const templateList = availableTemplates.map((apiKey) => ({
          title: apiKey.replace(/_/g, ' '),
          description: "Description not available",
          icon: "📜",
          apiKey,
        }));

        setTemplates([{ category: "Agreements", items: templateList }]);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const fetchTemplateDetails = async (apiKey) => {
    setLoading(true);
    setTemplateData(null);
    try {
      const response = await fetch(`http://backend.lejit.ai/api/api/docgen/get-template-questions?request=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch template details');
      }
      const data = await response.json();
      setTemplateData(data);
    } catch (error) {
      console.error(error);
      setTemplateData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (apiKey) => {
    setSelectedTemplate(apiKey);
    fetchTemplateDetails(apiKey);
  };

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newTemplate.title);
    formData.append('description', newTemplate.description);
    if (newTemplate.files) {
      Array.from(newTemplate.files).forEach((file) => {
        formData.append('files', file);
      });
    }

    try {
      const response = await axios.post('http://backend.lejit.ai/api/api/docgen/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Template created successfully:', response.data);
      setShowCreateTemplate(false);
      setNewTemplate({ title: '', description: '', files: null });
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif", color: "#333" }}>
      {!selectedTemplate && !showCreateTemplate && (
        <>
          <header style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Legal Document and Review Templates</h1>
            <p style={{ color: "#666" }}>
              Our team of lawyers have pre-defined legal templates to generate your law content within seconds.
            </p>
            <input
              type="text"
              placeholder="Search for your template..."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            />
          </header>

          <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {categories.map((category, index) => (
              <button
                key={index}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "20px",
                  backgroundColor: index === 0 ? "#0f67fd" : "#f5f5f5",
                  color: index === 0 ? "#fff" : "#0f67fd",
                  cursor: "pointer",
                }}
              >
                {category}
              </button>
            ))}
          </nav>

          <section>
            {templates.map((templateCategory, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
                  {templateCategory.category}
                </h2>
                <p style={{ color: "#666" }}>Create agreement content</p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  {templateCategory.items.map((item, idx) => (
                    <div
                    key={idx}
                    style={{
                      border: "1px solid transparent",
                      borderRadius: "10px",
                      padding: "15px",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      position: "relative",
                    }}
                    onClick={() => handleCardClick(item.apiKey)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(15, 103, 253, 0.4)";
                      e.currentTarget.style.borderColor = "#0f67fd"; // Lejit blue
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div style={{ fontSize: "30px", marginBottom: "10px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#666" }}>{item.description}</p>
                  </div>
                  
                  ))}
                  <div
                    style={{
                      border: "1px solid #eaeaea",
                      borderRadius: "10px",
                      padding: "15px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      textAlign: "center",
                    }}
                    onClick={() => setShowCreateTemplate(true)}
                  >
                    <div style={{ fontSize: "30px", marginBottom: "10px",  }}>➕</div>
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Create New Template</h3>
                    <p style={{ color: "#666" }}>Upload and configure a new template</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {showCreateTemplate && (
        <form onSubmit={handleCreateTemplate} style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Create a New Template</h2>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
            <input
              type="text"
              value={newTemplate.title}
              onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
            <textarea
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            ></textarea>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Files</label>
            <input
              type="file"
              multiple
              onChange={(e) => setNewTemplate({ ...newTemplate, files: e.target.files })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0f67fd",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => setShowCreateTemplate(false)}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              backgroundColor: "#ccc",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {selectedTemplate && (
        <div>
          <button
            onClick={() => setSelectedTemplate(null)}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#0f67fd",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Back to Templates
          </button>

          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Template Details</h2>

          {loading ? (
            <p>Loading...</p>
          ) : templateData ? (
            <DocumentGenerator documentType={selectedTemplate} questions={Object.entries(templateData).map(([key, value]) => ({ key, text: value }))} />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LegalDocumentTemplates;
