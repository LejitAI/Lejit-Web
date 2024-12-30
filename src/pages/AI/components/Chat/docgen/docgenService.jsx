class TemplateFetcher {
  constructor() {
    this.availableTemplates = [];
    this.templateQuestions = {};
    this.selectedTemplate = '';
    this.error = null;
  }

  async fetchAvailableTemplates() {
    try {
      const response = await fetch('api/api/docgen/get-available-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      const data = await response.json();
      this.availableTemplates = data.available_templates;
      return this.availableTemplates;
    } catch (error) {
      this.error = error.message;
      throw error;
    }
  }

  async fetchTemplateQuestions(template) {
    try {
      const response = await fetch(`api/api/docgen/get-template-questions?request=${template}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch template questions');
      }
      const data = await response.json();
      this.templateQuestions = data;
      this.selectedTemplate = template;
      return this.templateQuestions;
    } catch (error) {
      this.error = error.message;
      throw error;
    }
  }

  async generateDocument(documentType, userInput) {
    try {
      const response = await fetch('api/api/docgen/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_type: documentType,
          user_input: userInput,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate document');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      this.error = error.message;
      throw error;
    }
  }
}

export default TemplateFetcher;
