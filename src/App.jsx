import React, { useState } from 'react';
import jsPDF from 'jspdf';

const Form = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
    };

    const handleGeneratePDF = () => {
        const pdf = new jsPDF();
        const currentDate = new Date().toLocaleDateString(); 
        if (course === 'B.tech') {
            pdf.text(`Name: ${name}`, 10, 10);
            pdf.text(`Course: ${course}`, 10, 20);
            pdf.text(`Date of Offer: ${currentDate}`, 10, 30);
            pdf.save('Btech_form_details.pdf');
        } else if (course === 'M.tech') {
            pdf.text(`Name: ${name}`, 10, 10);
            pdf.text(`Course: ${course}`, 10, 20);
            pdf.text(`Date of Offer: ${currentDate}`, 10, 30);
            pdf.save('Mtech_form_details.pdf');
        }
    };

    const handleSubmit = () => {
        const formData = {
            name: name,
            course: course
        };
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data);
           
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    };

    return (
        <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
            <label htmlFor="name" className="block mb-2 text-black">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />

            <label htmlFor="course" className="block mb-2">Course:</label>
            <select id="course" value={course} onChange={handleCourseChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Select Course</option>
                <option value="B.tech">B.tech</option>
                <option value="M.tech">M.tech</option>
            </select>

            <button onClick={handleGeneratePDF} className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-2">Generate PDF</button>
            <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </div>
    );
};

export default Form;
