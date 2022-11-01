import React, { useState } from 'react';
import { STUDENTS } from '../studentsList';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}

function Search({
	setErrorMessage,
	setResidentsAdded,
	residentsAdded
}) {
	
	const [nameInput, setNameInput] = useState('')
	const [dateInput, setDateInput] = useState('')

	const searchForStudent=()=>{

		setErrorMessage('')

		function checkStudentName(student) {
			return nameInput.toLowerCase()===student.name.toLowerCase()
		}

		const studentAvailable= STUDENTS.filter(checkStudentName)

		if (!studentAvailable[0]){
			setErrorMessage(`Sorry, ${nameInput} is not a verified student!`)
			return;
		}

		const dateValid= checkValidity(dateInput, studentAvailable[0].validityDate)

		if (!dateValid){
			setErrorMessage(`Sorry, ${nameInput}'s validity has Expired!`)
			return;
		}

		if (!residentsAdded.includes(studentAvailable[0].name)){
			setResidentsAdded([...residentsAdded, studentAvailable[0].name]);
			setNameInput('')
			setDateInput('')
		}
		
		
	}

	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input id="studentName" data-testid="studentName" type="text" className="mr-30 mt-10" value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input id="joiningDate" data-testid="joiningDate" type="date" className="mr-30 mt-10" value={dateInput} onChange={(e)=>setDateInput(e.target.value)}/>
				</div>
			</label>
			<button type="button" data-testid="addBtn" className="small mb-0" onClick={searchForStudent} >Add</button>
		</div>
	);
}

export default Search;
