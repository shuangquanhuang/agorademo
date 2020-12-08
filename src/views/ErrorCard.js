import React from 'react';
import {connect} from 'react-redux';
import './ErrorCard.scss';

const ErrorCard = (props) => {

  return (
    <div className={"error-card"}>
      error
    </div>
  )
}

export default connect(
  null
)(ErrorCard);
