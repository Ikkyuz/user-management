import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/user.service';

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.create(formData);
      alert('บันทึกข้อมูลสำเร็จ');
      navigate('/users');
    } catch (error) {
      console.error('Create failed:', error);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">เพิ่มผู้ใช้ใหม่</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">ชื่อ</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ชื่อ"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">นามสกุล</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="นามสกุล"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">เบอร์ติดต่อ</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="เบอร์โทรศัพท์"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">อีเมล</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;