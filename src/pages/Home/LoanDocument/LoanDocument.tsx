import Table from '../../../components/Table/Table';
import './LoanDocument.css'
import React from 'react'

const LoanDocument = () => {
  return (
    <div className="loan-document">
      <div className="loan-document__heading">
        <h2 className="heading__title">Payment Schedule</h2>
        <p className="heading__subtitle">Step 3 of 5</p>
      </div>
      <Table />
    </div>
  );
}

export default LoanDocument
