import React, { useRef, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { IoMdPrint } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa"
import logo from "../assets/images/report.jpg";
// react-to-print
import { useReactToPrint } from "react-to-print";

const initialState = {
  patientName: "",
  gender: "",
  patientAge: "",
  doctorName: "",
  category: "",
  test: [
    {
      id: "",
      tname: "",
      tnormalRange: "",
      tresult: "",
      tprice: "",
    },
  ],
};

const Laboratory = () => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const testsData = [
    { "id": 1, "name": "CBC", "normalRange": "4.5 - 6.0", "price": 100, "category": "تحليل الدم" },  // تحليل الدم الكامل
    { "id": 2, "name": "FBS", "normalRange": "70 - 100", "price": 50, "category": "تحليل السكر" },   // تحليل سكر الدم الصائم
    { "id": 3, "name": "Lipid Profile", "normalRange": "< 200", "price": 75, "category": "تحليل الدهون" }, // تحليل الدهون
    { "id": 4, "name": "LFT", "normalRange": "7 - 56", "price": 120, "category": "تحليل وظائف الكبد" },   // تحليل وظائف الكبد
    { "id": 5, "name": "KFT", "normalRange": "0.6 - 1.2", "price": 110, "category": "تحليل وظائف الكلى" }, // تحليل وظائف الكلى
    { "id": 6, "name": "TSH", "normalRange": "0.4 - 4.0", "price": 90, "category": "تحليل الغدة الدرقية" },  // تحليل الغدة الدرقية
    { "id": 7, "name": "Iron", "normalRange": "60 - 170", "price": 80, "category": "تحليل الحديد" },  // تحليل الحديد
    { "id": 8, "name": "Vitamin D", "normalRange": "20 - 50", "price": 150, "category": "تحليل الفيتامينات" }, // تحليل فيتامين د
    { "id": 9, "name": "Calcium", "normalRange": "8.5 - 10.2", "price": 70, "category": "تحليل المعادن" }, // تحليل الكالسيوم
    { "id": 10, "name": "Potassium", "normalRange": "3.5 - 5.0", "price": 65, "category": "تحليل المعادن" } // تحليل البوتاسيوم
];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleNestedInputChange = (index, e) => {
    const { name, value } = e.target;
    const newTest = [...formData.test];
  
    if (name === "tname") {
      const selectedTest = testsData.find((test) => test.name === value);
      if (selectedTest) {
        newTest[index].tnormalRange = selectedTest.normalRange;
        newTest[index].tprice = selectedTest.price;
        newTest[index].category = selectedTest.category; // إضافة التصنيف
      }
    }
  
    newTest[index][name] = value;
    setFormData({ ...formData, test: newTest });
    calculateTotalPrice(newTest);
  };
  // handle total price

  const calculateTotalPrice = (tests) => {
    const total = tests.reduce((acc, test) => {
      const price = parseFloat(test.tprice) || 0; // Convert to number
      return acc + price;
    }, 0);
    setTotalPrice(total);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the save process
    const sendData = {
      date: date,
      patientName: formData.patientName,
      gender: formData.gender,
      patientAge: formData. patientAge,
      doctorName: formData.doctorName,
      category: formData.category,
      test: formData.test,
    };
    
    try {
      await axios.post("http://localhost:5000/patients", sendData);
      alert("تم الحفظ بنجاح!");
      setFormData(initialState);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.error(error);
        alert("حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const generateUniqueId = () => {
    return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, () => {
      const r = Math.floor(Math.random() * 16);
      return r.toString(16);
    });
  };
  // handlePrint using react-to-print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleAdd = () => {
    const newTest = {
      id: generateUniqueId(),
      tname: "",
      tnormalRange: "",
      tresult: "",
      tprice: "",
    };
    const updatedTests = [...formData.test, newTest];
    setFormData((prevState) => ({ ...prevState, test: updatedTests }));
    calculateTotalPrice(updatedTests); // تحديث المجموع بعد الإضافة
  };

  const handleDelete = (rowId) => {
    const updatedTests = formData.test.filter((test) => test.id !== rowId);
    setFormData((prevState) => ({ ...prevState, test: updatedTests }));
    calculateTotalPrice(updatedTests); // تحديث المجموع بعد الحذف
  };

  return (
    <div className="Lab flex justify-center p-4">
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-4 justify-center pt-10 w-full max-w-[1440px] h-full px-4"
      >
        <div className="flex flex-col md:flex-row justify-center mt-8 gap-4">
          <div className="flex flex-col relative w-full md:w-1/4">
            <input
              required
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="rounded-lg border-2 border-[#005497] bg-[#E6F4FF] p-3 w-full font-[Cairo] font-bold text-xl text-black"
              placeholder=" "
            />
            <label
              htmlFor="patientName"
              className={`absolute right-3 top-3 transition-all duration-200 transform ${
                formData.patientName
                  ? "scale-25 -translate-y-10"
                  : "translate-y-0"
              } origin-top-right font-[Cairo] font-bold text-lg text-black`}
            >
              اسم المريض
            </label>
          </div>

          <div className="flex flex-col relative w-full md:w-1/4">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="rounded-lg border-2 border-[#005497] bg-[#E6F4FF] p-[7px] w-full font-[Cairo] font-bold text-xl"
            >
              <option value="" disabled></option>
              <option value="ذكر">ذكر</option>
              <option value="انثى">انثى</option>
            </select>
            <label
              htmlFor="gender"
              className={`absolute right-3 top-3 transition-all duration-200 transform ${
                formData.gender ? "scale-25 -translate-y-10" : "translate-y-0"
              } origin-top-right font-[Cairo] font-bold text-lg text-black`}
            >
              الجنس
            </label>
          </div>

          <div className="flex flex-col relative w-full md:w-1/4">
            <input
              required
              type="number"
              id=" patientAge"
              name="patientAge"
              value={formData. patientAge}
              onChange={handleInputChange}
              className="rounded-lg border-2 border-[#005497] bg-[#E6F4FF] p-3 w-full font-[Cairo] font-bold text-xl text-black focus:outline-none focus:ring-2 focus:ring-[#005497] transition-all duration-200"
              placeholder=" "
            />
            <label
              htmlFor=" patientAge"
              className={`absolute right-3 top-3 transition-all duration-200 transform ${
                formData. patientAge
                  ? "scale-25 -translate-y-10"
                  : "translate-y-0"
              } origin-top-right font-[Cairo] font-bold text-lg text-black`}
            >
              العمر
            </label>
          </div>

          <div className="flex flex-col relative w-full md:w-1/4">
            <input
              required
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleInputChange}
              className="rounded-lg border-2 border-[#005497] bg-[#E6F4FF] p-3 w-full font-[Cairo] font-bold text-xl text-black focus:outline-none focus:ring-2 focus:ring-[#005497] transition-all duration-200"
              placeholder=" "
            />
            <label
              htmlFor="doctorName"
              className={`absolute right-3 top-3 transition-all duration-200 transform ${
                formData.doctorName
                  ? "scale-25 -translate-y-10"
                  : "translate-y-0"
              } origin-top-right font-[Cairo] font-bold text-lg text-black`}
            >
              اسم الطبيب
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center mt-8 gap-4">
          <div className="flex flex-col relative w-full md:w-1/4">
            <input
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={totalPrice}
              readOnly
              className="rounded-lg border-2 border-[#005497] bg-[#E6F4FF] p-3 w-full font-[Cairo] font-bold text-xl text-black"
            />
            {totalPrice > 0 && (
              <label
                htmlFor="totalPrice"
                className={`absolute right-3 top-3 transition-all duration-200 transform scale-25 -translate-y-10 origin-top-right font-[Cairo] font-bold text-lg text-black`}
              >
                المجموع
              </label>
            )}
          </div>
          <button
            type="submit"
            disabled={loading} 
            className={`font-[Cairo] font-bold text-xl text-white rounded-lg border-2 border-[#005497] bg-primary-color flex items-center justify-center p-3 w-full md:w-1/4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'جاري الحفظ...' : <><FaSave className="mr-2" /> حفظ</>}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="font-[Cairo] font-bold text-xl text-white rounded-lg border-2 border-[#005497] bg-primary-color flex items-center justify-center p-3 w-full md:w-1/4"
          >
            <IoMdPrint className="mr-2" />
            طباعة القائمة
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="font-[Cairo] font-bold text-xl text-white rounded-lg border-2 border-[#005497] bg-primary-color flex items-center justify-center p-3 w-full md:w-1/4"
          >
            <IoMdAdd className="mr-2" />
            اظافة قائمة
          </button>
        </div>

        {/* Table here */}
        <table className="min-w-full bg-white border border-gray-200 mt-8">
  <thead>
    <tr className="bg-primary-color text-white font-[Cairo] font-bold text-xl">
      <th className="p-4 text-center">اسم التحليل</th>
      <th className="p-4 text-center">المعدل الطبيعي</th>
      <th className="p-4 text-center">نتيجة التحليل</th>
      <th className="p-4 text-center">السعر</th>
      <th className="p-4 text-center">التصنيف</th> {/* إضافة عمود التصنيف */}
    </tr>
  </thead>
  <tbody>
    {formData.test.map((test, testIndex) => (
      <tr className="border-b hover:bg-gray-100" key={testIndex}>
        <td className="p-4">
          <select
            required
            id="tname"
            name="tname"
            value={test.tname}
            onChange={(e) => handleNestedInputChange(testIndex, e)}
            className="bg-[#E6F4FF] p-2 w-full font-[Cairo] font-bold text-xl text-black rounded"
          >
            <option value="" disabled></option>
            {testsData.map((testData, index) => (
              <option key={index} value={testData.name}>
                { testData.name}
              </option>
            ))}
          </select>
        </td>
        <td className="p-4">
          <input
            required
            type="text"
            id="tnormalRange"
            name="tnormalRange"
            value={test.tnormalRange}
            onChange={(e) => handleNestedInputChange(testIndex, e)}
            className="bg-[#E6F4FF] p-2 w-full font-[Cairo] font-bold text-xl text-black rounded"
          />
        </td>
        <td className="p-4">
          <input
            required
            type="text"
            id="tresult"
            name="tresult"
            value={test.tresult}
            onChange={(e) => handleNestedInputChange(testIndex, e)}
            className="bg-[#E6F4FF] p-2 w-full font-[Cairo] font-bold text-xl text-black rounded"
          />
        </td>
        <td className="p-4 flex items-center">
          <input
            required
            type="number"
            id="tprice"
            name="tprice"
            value={test.tprice}
            onChange={(e) => handleNestedInputChange(testIndex, e)}
            className="bg-[#E6F4FF] p-2 w-full font-[Cairo] font-bold text-xl text-black rounded"
          />
          <span
            className="ml-2 cursor-pointer transform transition-transform duration-200 hover:scale-110"
            onClick={() => handleDelete(test.id)}
          >
            <MdDeleteForever className="text-red-500 text-2xl" />
          </span>
        </td>
        <td className="p-4">
          <input
            type="text"
            id="category"
            name="category"
            value={test.category}
            readOnly
            className="bg-[#E6F4FF] p-2 w-full font-[Cairo] font-bold text-xl text-black rounded"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

        <div className="flex justify-center mt-5">
          <div className="rounded-t-[30px] rounded-b-[100px] text-white bg-primary-color flex p-4 w-[60px] h-[60px]">
            <button
              type="button"
              onClick={handleAdd}
              className="flex w-full h-full items-center justify-center"
            >
              <IoMdAdd className="w-[30px] h-[30px]" />
            </button>
          </div>
        </div>
      </form>

      <div className="hidden">
        <div
          ref={componentRef}
          className="p-6 rounded-lg shadow-md max-w-2xl mx-auto w-full text-left"
        >
          <img
            src={logo}
            alt="report"
            className="rounded-full border-2 border-secondary-color w-32 h-32 mx-auto"
          />

          <h1 className="text-2xl font-bold text-primary-color text-center mt-4">
            Laboratory Report
          </h1>

          <p className="text-left text-gray-600">
            Date: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-primary-color">
            Patient Information
          </h2>
          <p classNamea="text-left font-[Cairo] ">
            {formData.patientName}
            <strong className="mr-2"> :Patient Name</strong>
          </p>
          <p classNamea="text-left font-[Cairo] ">
            {formData.gender}
            <strong className="mr-2">:Gender</strong>
          </p>
          <p classNamea="text-left font-[Cairo] ">
            {formData.patientAge}
            <strong className="mr-2">:Age</strong>
          </p>
          <p classNamea="text-left font-[Cairo] ">
            {formData.doctorName}
            <strong className="mr-2">:Doctor</strong>
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2 text-primary-color text-center  ">
            Test Results
          </h2>
          <table className="min-w-full bg-white border border-secondary-color rounded-lg shadow-md text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Normal Range</th>
                <th className="py-2 px-4 border-b">Result</th>
                <th className="py-2 px-4 border-b">Test</th>
              </tr>
            </thead>
            <tbody>
              {formData.test.map((test, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{test.tprice}</td>
                  <td className="py-2 px-4 border-b">{test.tnormalRange}</td>
                  <td className="py-2 px-4 border-b">{test.tresult}</td>
                  <td className="py-2 px-4 border-b">{test.tname}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-xl font-semibold m-6 mb-2 text-primary-color text-right font-[Cairo] ">
            السعر الاجمالي:{totalPrice}
            <span>دينار عراقي</span>
          </p>
          <p className="text-xl font-semibold text-right  mt-6 font-[Cairo] ">
            ملاحظات الطبيب :
          </p>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
