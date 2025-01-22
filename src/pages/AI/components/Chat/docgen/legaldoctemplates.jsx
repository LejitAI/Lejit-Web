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
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: '', description: '', files: null });
  const [searchTerm, setSearchTerm] = useState("");

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
        setFilteredTemplates([{ category: "Agreements", items: templateList }]);
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    if (!query) {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        ),
      }));
      setFilteredTemplates(filtered);
    }
  };

  return (
    <div style={{ padding: "18px", fontFamily: "Poppins, sans-serif", color: "#333", transform: "scale(0.9)" }}>
      {!selectedTemplate && !showCreateTemplate && (
        <>
          <header style={{ marginBottom: "18px" }}>
            <h1 style={{ fontSize: "21.6px", fontWeight: "bold" }}>Legal Document and Review Templates</h1>
            <p style={{ color: "#666" }}>
              Our team of lawyers have pre-defined legal templates to generate your law content within seconds.
            </p>
            <input
              type="text"
              placeholder="Search for your template..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: "100%",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "4.5px",
                marginTop: "9px",
              }}
            />
          </header>

          <nav style={{ display: "flex", gap: "9px", marginBottom: "18px" }}>
            {categories.map((category, index) => (
              <button
                key={index}
                style={{
                  padding: "9px 18px",
                  border: "none",
                  borderRadius: "18px",
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
            {filteredTemplates.map((templateCategory, index) => (
              <div key={index} style={{ marginBottom: "18px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "9px" }}>
                  {templateCategory.category}
                </h2>
                <p style={{ color: "#666" }}>Create agreement content</p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))",
                    gap: "18px",
                    marginTop: "18px",
                  }}
                >
                  {templateCategory.items.map((item, idx) => (
                    <div
                    key={idx}
                    style={{
                      border: "1px solid transparent",
                      borderRadius: "9px",
                      padding: "13.5px",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                      boxShadow: "0 1.8px 4.5px rgba(0, 0, 0, 0.1)",
                      position: "relative",
                    }}
                    onClick={() => handleCardClick(item.apiKey)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 3.6px 9px rgba(15, 103, 253, 0.4)";
                      e.currentTarget.style.borderColor = "#0f67fd"; // Lejit blue
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 1.8px 4.5px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div style={{ fontSize: "27px", marginBottom: "9px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "16.2px", fontWeight: "bold", marginBottom: "9px" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#666" }}>{item.description}</p>
                  </div>
                  
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Add Template Button */}
          <button
            onClick={() => setShowCreateTemplate(true)}
            style={{
              position: "fixed",
              bottom: "80px", // Adjusted position
              right: "40px", // Adjusted position
              padding: "12px 30px", // Adjusted size
              backgroundColor: "#0F67FD",
              color: "#FFFFFF",
              borderRadius: "12px", // Adjusted border radius
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "14px", // Adjusted font size
              textTransform: "uppercase",
              zIndex: 1000,
            }}
          >
            Create New Template
          </button>
        </>
      )}

      {showCreateTemplate && (
        <form onSubmit={handleCreateTemplate} style={{ maxWidth: "540px", margin: "auto" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "18px" }}>Create a New Template</h2>

          <div style={{ marginBottom: "13.5px" }}>
            <label style={{ display: "block", marginBottom: "4.5px" }}>Title</label>
            <input
              type="text"
              value={newTemplate.title}
              onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "4.5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "13.5px" }}>
            <label style={{ display: "block", marginBottom: "4.5px" }}>Description</label>
            <textarea
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "4.5px",
              }}
            ></textarea>
          </div>

          <div style={{ marginBottom: "13.5px" }}>
            <label style={{ display: "block", marginBottom: "4.5px" }}>Files</label>
            <input
              type="file"
              multiple
              onChange={(e) => setNewTemplate({ ...newTemplate, files: e.target.files })}
              required
              style={{
                width: "100%",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "4.5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "9px 18px",
              backgroundColor: "#0f67fd",
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => setShowCreateTemplate(false)}
            style={{
              marginLeft: "9px",
              padding: "9px 18px",
              backgroundColor: "#ccc",
              color: "#000",
              border: "none",
              borderRadius: "9px",
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
              marginBottom: "18px",
              padding: "9px 18px",
              border: "none",
              borderRadius: "9px",
              backgroundColor: "#0f67fd",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Back to Templates
          </button>

          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Template Details</h2>

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
