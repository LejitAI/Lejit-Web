import React, { useState } from 'react';
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

  const templates = [
    {
      category: "Agreements",
      items: [
        {
          title: "Power of Attorney ",
          description: "Generate a Power of Attorney based on the provided information",
          icon: "📃",
          apiKey: "Power_of_Attorney",
        },
        {
          title: "Purchase of Goods Agreement",
          description: "A simple agreement to buy or sell goods",
          icon: "🗬",
          apiKey: "sale",
        },
        {
          title: "Create Agreement Outline",
          description: "Create an outline of the key clauses needed for your contract",
          icon: "📝",
          apiKey: "create_agreement_outline",
        },
        {
          title: "One Shot Agreement creator",
          description: "Create an entire agreement in one go",
          icon: "🛠️",
          apiKey: "one_shot_agreement_creator",
        },
      ],
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif", color: "#333" }}>
      {!selectedTemplate && (
        <>
          <header style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Legal Document And Review Templates</h1>
            <p style={{ color: "#666" }}>
              Our team of lawyers have pre-defined legal templates to generate your law content within seconds
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
                  backgroundColor: index === 0 ? "#000" : "#f5f5f5",
                  color: index === 0 ? "#fff" : "#000",
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
                        border: "1px solid #eaeaea",
                        borderRadius: "10px",
                        padding: "15px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        transition: "transform 0.3s, box-shadow 0.3s",
                      }}
                      onClick={() => handleCardClick(item.apiKey)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
                      }}
                    >
                      <div style={{ fontSize: "30px", marginBottom: "10px" }}>{item.icon}</div>
                      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{item.title}</h3>
                      <p style={{ color: "#666" }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {selectedTemplate && (
        <div>
          <button
            onClick={() => setSelectedTemplate(null)}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#000",
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
