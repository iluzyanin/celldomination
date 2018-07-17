import React from 'react';
import PropTypes from 'prop-types';
import './border.css';

const Border = (props) => {
  const borderClassName = props.className + (props.isActive ? ' active' : '');

  return (
    <div
      className={borderClassName}
      onClick={props.onClick}></div>
    );
};

Border.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Border;