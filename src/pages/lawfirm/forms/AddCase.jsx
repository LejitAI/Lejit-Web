import React, { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select'; // Import react-select
import './AddCase.css';

Modal.setAppElement('#root'); 

const AddCase = ({ isOpen, onClose }) => {
    const caseTypeOptions = [
        { value: 'civil', label: 'Civil' },
        { value: 'criminal', label: 'Criminal' },
        { value: 'family', label: 'Family Law' },
        { value: 'corporate', label: 'Corporate' },
        { value: 'intellectual_property', label: 'Intellectual Property' },
        { value: 'labor', label: 'Labor Law' },
        { value: 'tax', label: 'Tax Law' },
        { value: 'immigration', label: 'Immigration' },
        { value: 'environmental', label: 'Environmental Law' },
        { value: 'administrative', label: 'Administrative Law' },
    ];

    const clientTypeOptions = [
        { value: 'individual', label: 'Individual' },
        { value: 'company', label: 'Company' },
        { value: 'government', label: 'Government' },
        { value: 'nonprofit', label: 'Non-Profit Organization' },
        { value: 'international', label: 'International Client' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="addCaseModal"
            overlayClassName="modalOverlay"
        >
            <div className="addCaseContainer">
                <div className="addCaseHeader">
                    <h2 className="addCaseTitle">Add Case</h2>
                    <p className="addCaseSubtitle">
                        Provide key details about your case to help clients understand your expertise and experience.
                    </p>
                    <button className="closeButton" onClick={onClose}>×</button>
                </div>


                <div className="addCaseContent">
                    <form className="caseForm">
                        <div className="formGroup">
                            <label>Case Title<span className="required">*</span></label>
                            <input type="text" placeholder="Title" />
                        </div>
                        <div className="formGroup">
                            <label>Starting Date</label>
                            <input type="date" placeholder="DD/MM/YYYY" />
                        </div>
                        <div className="formGroup">
                            <label>Case Type<span className="required">*</span></label>
                            <Select 
                                options={caseTypeOptions}
                                placeholder="Select case type"
                                isSearchable
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className="formGroup">
                            <label>Client<span className="required">*</span></label>
                            <Select 
                                options={clientTypeOptions}
                                placeholder="Select the client type"
                                isSearchable
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className="formGroup">
                            <label>Opposite Client</label>
                            <input type="text" placeholder="Opposite Client" />
                        </div>
                        <div className="formGroup">
                            <label>Case Witness</label>
                            <input type="text" placeholder="Case Witness" />
                        </div>
                        <div className="formGroup">
                            <label>Case Description</label>
                            <textarea placeholder="Write a short introduction"></textarea>
                        </div>
                        <div className="formGroup">
                            <label>Add Documents</label>
                            <input type="file" multiple />
                        </div>
                    </form>

                    {/* Prepare Case Documents Section */}
                    <div className="prepareDocuments">
                        <div className="iconWrapper">
                            <div className="iconBackground">
                                <span className="icon">📄</span>
                            </div>
                        </div>
                        <div className="documentContent">
                            <p className="documentTitle">Prepare Case Documents</p>
                            <p className="documentSubtitle">
                                Prepare your case documents with the help of ChatGPT and get a list of lawyers who can assist with your case.
                            </p>
                        </div>
                        <div className="arrowWrapper">→</div>
                    </div>
                </div>

                <div className="addCaseFooter">
                    <button className="cancelButton" onClick={onClose}>Cancel</button>
                    <button className="saveButton">Save Case</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddCase;
