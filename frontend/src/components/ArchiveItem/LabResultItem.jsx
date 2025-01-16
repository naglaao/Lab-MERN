import React from 'react';
import PropTypes from 'prop-types';

const LabResultItem = ({ patientName, date, category, result, handlePrint, handleShare }) => {
    return (
        <div className="lab-result-item border border-gray-300 p-4 mb-4 rounded-lg shadow-lg transition-transform transform hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800">{patientName}</h3>
            <p className="text-gray-600">تاريخ الفحص: {date}</p>
            <p className="text-gray-600">نوع الفحص: {category}</p>
            <p className="text-gray-600">النتيجة: <span className="font-bold">{result || 'غير متوفر'}</span></p>
            <div className="mt-4">
                <button 
                    onClick={handlePrint} 
                    className="m-4 bg-blue-500 text-white p-2 rounded-lg mr-2 transition-colors duration-300 hover:bg-blue-600"
                    aria-label={`تنزيل نتيجة الفحص لـ ${patientName}`}
                >
                    تنزيل
                </button>
                <button 
                    onClick={handleShare} 
                    className="m-4 bg-green-500 text-white p-2 rounded-lg transition-colors duration-300 hover:bg-green-600"
                    aria-label={`مشاركة نتيجة الفحص لـ ${patientName}`}
                >
                    مشاركة
                </button>
            </div>
        </div>
    );
};

LabResultItem.propTypes = {
    patientName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    result: PropTypes.string,
    handlePrint: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
};

export default LabResultItem;