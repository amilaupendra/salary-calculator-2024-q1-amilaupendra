"use client";

import React, { useState } from "react";
import Earnings from "./components/earnings/Earnings";
import AddIcon from "@mui/icons-material/Add";
import Deductions from "./components/deductions/deductions";
import CachedIcon from "@mui/icons-material/Cached";

const Page = () => {
  const [earnings, setEarnings] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [basicSalary, setBasicSalary] = useState(0);

  //Add earnings
  const handleAddEarnings = () => {
    setEarnings([
      ...earnings,
      { id: earnings.length + 1, type: "", payment: 0, isChecked: false },
    ]);
  };

  //add deductions
  const handleAddDeductions = () => {
    setDeductions([
      ...deductions,
      { id: deductions.length + 1, type: "", amount: 0 },
    ]);
  };

  //handle allowance type
  const handleAllowanceTypeChange = (id, type) => {
    setEarnings(
      earnings.map((earning) =>
        earning.id === id ? { ...earning, type } : earning
      )
    );
  };

  //handle deduction type
  const handleDeductionTypeChange = (id, type) => {
    setDeductions(
      deductions.map((deduction) =>
        deduction.id === id ? { ...deduction, type } : deduction
      )
    );
  };

  //handle allowance amount
  const handleAllowancePaymentChange = (id, payment) => {
    setEarnings(
      earnings.map((earning) =>
        earning.id === id ? { ...earning, payment } : earning
      )
    );
  };

  //handle deduction amount
  const handleDeductionAmountChange = (id, amount) => {
    setDeductions(
      deductions.map((deduction) =>
        deduction.id === id ? { ...deduction, amount: amount } : deduction
      )
    );
  };

  //handle checkbox
  const handleCheckboxChange = (id, isChecked) => {
    setEarnings(
      earnings.map((earning) =>
        earning.id === id ? { ...earning, isChecked } : earning
      )
    );
  };

  //delete earninngs
  const handleDeleteEarnings = (id) => {
    setEarnings(earnings.filter((earning) => earning.id !== id));
  };

  //delete deductions
  const handleDeleteDeductions = (id) => {
    setDeductions(deductions.filter((deduction) => deduction.id !== id));
  };

  //get total amount of all the alowances
  const totalAllowances = earnings.reduce(
    (total, earning) => total + earning.payment,
    0
  );

  //get total amount of all the deductions available for epf
  const epfAddedAllowances = earnings
    .filter((earning) => earning.isChecked)
    .reduce((total, earning) => total + earning.payment, 0);

    //gorss salary
  const grossSalary = basicSalary + totalAllowances;

  //employee contribution to epf
  const employeeContributionToEpf = basicSalary + epfAddedAllowances;

  // const deduction = earnings.some((earning) => earning.isChecked)
  //   ? grossSalary * 0.12
  //   : 0;


  //get total amount of deductions
  const grossDeduction = deductions.reduce(
    (total, deduction) => total + deduction.amount,
    0
  );

  //gross earnings
  const grossEarnings = grossSalary - grossDeduction;

  //APIT calculation
  let apit;

  if (grossEarnings <= 100000) {
    apit = 0;
  } else if (grossEarnings > 100000 && grossEarnings <= 141667) {
    apit = (grossEarnings * 6) / 100 - 6000;
  } else if (grossEarnings > 141667 && grossEarnings <= 183333) {
    apit = (grossEarnings * 12) / 100 - 14500;
  } else if (grossEarnings > 183333 && grossEarnings <= 225000) {
    apit = (grossEarnings * 18) / 100 - 25500;
  } else if (grossEarnings > 225000 && grossEarnings <= 266667) {
    apit = (grossEarnings * 24) / 100 - 39000;
  } else if (grossEarnings > 266667 && grossEarnings < 308333) {
    apit = (grossEarnings * 30) / 100 - 55000;
  } else {
    apit = (grossEarnings * 36) / 100 - 73500;
  }

  //employee epf
  const employeeEpf = (8 / 100) * (employeeContributionToEpf - grossDeduction);
  //EMployeer ETF
  const employerEtf = ((employeeContributionToEpf - grossDeduction) * 3) / 100;

  //Employer EPF
  const employerEPF = ((employeeContributionToEpf - grossDeduction) * 12) / 100;

  //Cost to Company
  const costToCompany = grossEarnings + employerEtf + employerEPF;

  //net SAlary
  const netSalary = grossEarnings - employeeEpf - apit;

  const handleRefresh = () => {
    window.location.reload();
  };

  console.log("netSalary", grossEarnings, employeeEpf, apit);

  return (
    <div className="container w-full min-h-screen md:flex bg-white-50">
      <div className="h-auto p-4 m-2 bg-neutral-100 rounded-2xl md:w-2/3 calculatorContainer">
        <h1 className="mb-4 text-xl font-bold">Calculate your salary</h1>
        <span className="flex justify-end text-blue-600">
          <button onClick={handleRefresh}>
            <CachedIcon></CachedIcon>
          </button>
        </span>
        <h2 className="mb-4 text-lg font-bold">Basic Salary</h2>
        <div className="container flex flex-col h-auto p-4 rounded-lg bg-natural-100">
          <input
            className="bg-white rounded-lg md:w-1/3"
            id="basicSalary"
            type="number"
            onChange={(e) => setBasicSalary(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Earnings</h2>
          <h6 className="text-sm text-gray-400">
            Allowance, Fixed Allowance, Bonus and etc
          </h6>
          {earnings.map((earning) => (
            <Earnings
              key={earning.id}
              id={earning.id}
              handleAllowanceTypeChange={handleAllowanceTypeChange}
              handleAllowancePaymentChange={handleAllowancePaymentChange}
              handleCheckboxChange={handleCheckboxChange}
              handleDelete={handleDeleteEarnings}
            />
          ))}
          <button
            onClick={handleAddEarnings}
            className="mt-5 mr-2 font-bold text-blue-600 rounded-3xl"
          >
            <AddIcon /> Add new Allowances
          </button>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">Deductions</h2>
          <h6 className="text-sm text-gray-400">
            Salary Advances, Load Deductions and all
          </h6>
          {deductions.map((deductions) => (
            <Deductions
              key={deductions.id}
              id={deductions.id}
              handleDeductionTypeChange={handleDeductionTypeChange}
              handleDeductionAmountChange={handleDeductionAmountChange}
              handleDelete={handleDeleteDeductions}
            />
          ))}

          <button
            onClick={handleAddDeductions}
            className="mt-5 mr-2 font-bold text-blue-600 rounded-3xl"
          >
            <AddIcon /> Add new Deduction
          </button>
        </div>
      </div>
      <div className="p-4 m-4 bg-white rounded-2xl md:w-1/3 calculatorContainer">
        <h2 className="text-lg font-bold">Salary Breakdown</h2>
        <div className="flex flex-col justify-between p-8 rounded-xl">
          <div className="flex justify-between mb-1">
            <h6 className="text-lg text-gray-400">Items </h6>
            <h6 className="text-lg text-gray-400">Amount</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">Basic Salary: </h6>
            <h6 className="text-lg">{basicSalary}</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">Gross Earnings: </h6>
            <h6 className="text-lg">{grossSalary}</h6>
          </div>
          {/* <div className="flex justify-between">
            <h6 className="text-lg">EPF added earnings: </h6>
            <h6 className="text-lg">{epfAddedAllowances}</h6>
          </div> */}
          <div className="flex justify-between">
            <h6 className="text-lg">Gross Deductions: </h6>
            <h6 className="text-lg">{grossDeduction}</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">Employee EPF (8%): </h6>
            <h6 className="text-lg">{employeeEpf}</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">APIT: </h6>
            <h6 className="text-lg">{apit}</h6>
          </div>
          <div className="flex justify-between border-2 border-black">
            <h6 className="text-lg font-bold">Net Salary (take Home): </h6>
            <h6 className="text-lg font-bold">{netSalary}</h6>
          </div>
          <div className="flex justify-between mt-6 mb-1">
            <h6 className="text-lg text-gray-400">
              Contribution from the Employer{" "}
            </h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">Employer EPF: </h6>
            <h6 className="text-lg">{employerEPF}</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">Employer ETF: </h6>
            <h6 className="text-lg">{employerEtf}</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg">Cost to Compnay: </h6>
            <h6 className="text-lg">{costToCompany}</h6>
          </div>
          <div className="bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
