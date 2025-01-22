import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';  // استيراد الأيقونات

const Header = ({ handelSearh }) => {
    return (
        <header className="font-[Cairo] font-bold text-xl text-white rounded-lg border-2 border-[#005497] bg-primary-color flex items-center justify-center p-3 w-full shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                {/* العنوان */}
                <h1 className="text-3xl font-semibold">الأرشيف</h1>
                
                <nav>
                    <ul className="flex space-x-6">
                        {/* الرابط الرئيسي مع أيقونة */}
                        <li>
                            
                            <Link 
                                to={'/'}
                                className="flex items-center space-x-2 hover:underline transition-all duration-300 font-[Cairo] font-bold text-xl text-white rounded-lg border-2 border-[#005497] bg-primary-color p-3"
                            >
                                <FaHome />  {/* أيقونة الرئيسية */}
                            </Link>
                        </li>
                        
                        <li>
                            <Link 
                                to={'/Archives/Address'} 
                                className="flex items-center space-x-2 hover:underline transition-all duration-300 font-[Cairo] font-bold text-xl text-white rounded-lg border-2 border-[#005497] bg-primary-color p-3"
                            >
                                <FaMapMarkerAlt />  {/* أيقونة اتصل بنا */}
                               
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* حقل البحث */}
                <input 
                    type="search" 
                    onChange={handelSearh} 
                    placeholder="بحث..."
                    className="p-2 rounded-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
        </header>
    );
}

export default Header;
