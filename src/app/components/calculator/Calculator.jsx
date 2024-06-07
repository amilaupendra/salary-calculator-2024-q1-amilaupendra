import React from 'react'

const Calculator = () => {
  return (
    <div className='container flex-row h-auto p-4 rounded-lg bg-slate-400'>
        <label htmlFor="basicSalary">Basic Salary</label>
        <input className='rounded-lg w-80' id='basicSalary' type='number'></input>
    </div>
  )
}

export default Calculator