import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../components/ArchiveItem/Header";
import LabResultItem from "../components/ArchiveItem/LabResultItem";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Outlet } from "react-router-dom";
import { debounce } from "lodash";

const PatientInfoPrint = React.forwardRef(({ patientData }, ref) => {
  const { patientName, gender, patientAge, doctorName, test, totalPrice } =
    patientData;

  // تنسيق التاريخ ليظهر بشكل مفهوم
  const formattedDate = new Date().toLocaleString("ar-IQ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      ref={ref}
      className="p-6 rounded-lg shadow-md max-w-2xl mx-auto w-full text-left"
    >
      <h1 className="text-2xl font-bold text-primary-color text-center mt-4">
        Laboratory Report
      </h1>

      <p className="text-left text-gray-600">Date: {formattedDate}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-primary-color">
        Patient Information
      </h2>
      <p className="text-left font-[Cairo]">
        <strong className="mr-2">اسم المريض :</strong> {patientName}
      </p>
      <p className="text-left font-[Cairo]">
        <strong className="mr-2">الجنس:</strong> {gender}
      </p>
      <p className="text-left font-[Cairo]">
        <strong className="mr-2">العمر:</strong> {patientAge}
      </p>
      <p className="text-left font-[Cairo]">
        <strong className="mr-2">اسم الطبيب:</strong> {doctorName}
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2 text-primary-color text-center">
        Test Results
      </h2>
      <table className="min-w-full bg-white border border-secondary-color rounded-lg shadow-md text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Normal Range</th>
            <th className="py-2 px-4 border-b">Result</th>
            <th className="py-2 px-4 border-b">اسم التحليل</th>
          </tr>
        </thead>
        <tbody>
          {test.map((testItem, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{testItem.tprice}</td>
              <td className="py-2 px-4 border-b">{testItem.tnormalRange}</td>
              <td className="py-2 px-4 border-b">{testItem.tresult}</td>
              <td className="py-2 px-4 border-b">{testItem.tname}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xl font-semibold m-6 mb-2 text-primary-color text-right font-[Cairo]">
        السعر الاجمالي: {totalPrice} <span>دينار عراقي</span>
      </p>
      <p className="text-xl font-semibold text-right mt-6 font-[Cairo]">
        ملاحظات الطبيب:
      </p>
    </div>
  );
});

const Archives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const componentRef = useRef();

  const handleSearch = useCallback(
    debounce((event) => {
      setSearchTerm(event.target.value);
    }, 500),
    []
  );

  const handleShare = (patientName) => {
    alert(`مشاركة نتائج ${patientName}...`);
  };

  const fetchLabResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/patients");
      setLabResults(response.data);
    } catch (error) {
      let errorMessage =
        "حدث خطأ أثناء تحميل نتائج الفحوصات. يرجى المحاولة لاحقًا.";
      if (error.response) {
        errorMessage = `خطأ: ${error.response.status} - ${
          error.response.data.message || errorMessage
        }`;
      } else if (error.request) {
        errorMessage =
          "لم يتم استلام استجابة من الخادم. يرجى التحقق من الاتصال بالإنترنت.";
      }
      setError(errorMessage);
      console.error("Error fetching lab results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabResults();
  }, []);

  const filteredResults = labResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "معلومات المريض",
    onAfterPrint: () => alert("تم تحميل المعلومات بنجاح!"),
  });

  return (
    <div className="flex bg-gray-100 h-[800px]">
      <div className="flex-1 p-6">
        <Header handleSearch={handleSearch} />
        <main className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            نتائج الفحوصات المخبرية
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <span className="loader"></span>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              {filteredResults.map((result) => (
                <LabResultItem
                  key={result.id}
                  patientName={result.patientName}
                  date={result.date} 
                  category={result.test[0].category} 
                  result={result.test[0].tresult} 
                  handlePrint={() => {
                    setSelectedResult({
                      patientName: result.patientName,
                      gender: result.gender,
                      patientAge: result.patientAge,
                      doctorName: result.doctorName,
                      test: result.test,
                      totalPrice: result.totalPrice,
                      
                    });
                    handlePrint();
                  }}
                  handleShare={() => handleShare(result.patientName)}
                />
              ))}
            </div>
          )}
        </main>
        <footer className="text-center mt-4 text-sm text-gray-600">
          <p>حقوق النشر © 2024</p>
        </footer>
        <Outlet />
      </div>
      {selectedResult && (
        <div style={{ display: "none" }}>
          <PatientInfoPrint ref={componentRef} patientData={selectedResult} />
        </div>
      )}
    </div>
  );
};

export default Archives;
