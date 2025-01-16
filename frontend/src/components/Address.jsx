import React from 'react';

const Address = () => {
  return (
    <div className="max-w-full mx-auto bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">مرحبًا بكم في مختبرنا الطبي!</h1>
        <p className="text-lg text-gray-600">لأي استفسارات، لا تترددوا في الاتصال بنا.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg text-gray-800">حجز موعد</h2>
          <p className="text-gray-600">info@lab.com</p>
          <p className="text-gray-600">📞 (123) 456-7890</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg text-gray-800">استفسارات فحوصات</h2>
          <p className="text-gray-600">business@lab.com</p>
          <p className="text-gray-600">📞 (123) 456-7891</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg text-gray-800">فرص العمل</h2>
          <p className="text-gray-600">careers@lab.com</p>
          <p className="text-gray-600">📞 (123) 456-7892</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">مختبرنا</h2>
      <p className="text-lg text-gray-600 mb-2">العنوان: 123 شارع العلم، المدينة، الدولة</p>

      <div className="mt-6">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d213277.84512612066!2d44.71966480546874!3d33.35888950000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1557826175ff33bb%3A0x6fa00c632cceea95!2z2YXYrtiq2KjYsSDYp9mE2YbYrtio2Kkg2YTZhNiq2K3ZhNmK2YTYp9iqINin2YTZhdix2LbZitip!5e0!3m2!1sar!2siq!4v1736627385317!5m2!1sar!2siq" 
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Address;
