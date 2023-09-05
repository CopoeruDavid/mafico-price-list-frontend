// UrlInput.js
import React from 'react';
import { TextInput} from 'react-admin';
import PropTypes from 'prop-types';

const validateUrl = (value) => {
  // Regular expression for URL validation
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/i;
  if (value == "" || value == null){
    return undefined;
  }
  if (!urlRegex.test(value)) {
    return 'Invalid URL. Please enter a valid URL. It must contain http:// or https://';
  }
  return undefined; // No error
};

const UrlInput = ({ label, source }) => (
  <TextInput
    name={source}
    component="input"
    type="text"
    label={label}
    validate={validateUrl}
  />
);

UrlInput.propTypes = {
  label: PropTypes.string,
  source: PropTypes.string,
};

export default UrlInput;
