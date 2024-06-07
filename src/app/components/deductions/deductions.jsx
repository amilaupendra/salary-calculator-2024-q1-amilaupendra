import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

//deductions component
const Deductions = ({ id, handleDeductionTypeChange, handleDeductionAmountChange, handleDelete}) => {

    const handleDeductionsType = (e) => {
        handleDeductionTypeChange(id, e.target.value);
      };
    
      const handleAmount = (e) => {
        handleDeductionAmountChange(id, parseFloat(e.target.value) || 0);
      };
    
      const handleClear = () => {
        handleDelete(id);
      };
  return (
    <div className="container flex flex-row h-auto p-4 rounded-xl ">
    <input onChange={handleDeductionsType} className="w-40 mr-2 rounded-lg" type="text" />
    <input onChange={handleAmount} className="w-40 mr-2 rounded-lg" type="number" />
    <button onClick={handleClear} className="mr-2 font-bold text-black bg-gray-300 hover:bg-blue-700 rounded-3xl">
      <CloseIcon />
    </button>
    </div>
  )
}

export default Deductions