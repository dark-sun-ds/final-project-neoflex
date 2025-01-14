import React from "react";
import { useParams } from "react-router-dom";
import Scoring from "../../components/Scoring/Scoring";
import NotFound from "../NotFound/NotFound";
import './LoanDetails.css'
const LoanDetails = () => {
  const { id } = useParams();
  const idLS = localStorage.getItem("id");
  const isValidId = Number(idLS) === Number(id);

  return isValidId ? (
    <div className="loan">
      <Scoring />
    </div>
  ) : <NotFound />;
};

export default LoanDetails;
