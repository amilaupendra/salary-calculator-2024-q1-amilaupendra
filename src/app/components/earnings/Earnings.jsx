import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

//Earnings component
const Earnings = ({ id, handleAllowanceTypeChange, handleAllowancePaymentChange, handleCheckboxChange, handleDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleTypeChange = (e) => {
    handleAllowanceTypeChange(id, e.target.value);
  };

  const handlePaymentChange = (e) => {
    handleAllowancePaymentChange(id, parseFloat(e.target.value) || 0);
  };

  const handleClear = () => {
    handleDelete(id);
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    handleCheckboxChange(id, e.target.checked);
  };

  return (
    <div className="flex-row h-auto p-4 rounded-lg md:flex bg-neutral-100">
      <input onChange={handleTypeChange} className="mb-2 mr-2 rounded-lg " type="text" placeholder="Pay Details(Title)"/>
      <input onChange={handlePaymentChange} className="mb-2 mr-2 rounded-lg " type="number" />
      <button onClick={handleClear} className="mr-2 font-bold text-black bg-gray-300 hover:bg-blue-700 rounded-3xl">
        <CloseIcon />
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="epfEtf"
          checked={isChecked}
          onChange={handleCheckbox}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="epfEtf" className="text-black">EPF/ETF</label>
      </div>
    </div>
  );
};

export default Earnings;
