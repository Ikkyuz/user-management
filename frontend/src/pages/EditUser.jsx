import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../Services/user.service';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getById(id)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.update(id, user);
      alert('อัปเดตข้อมูลสำเร็จ');
      navigate('/users');
    } catch (error) {
      console.error('Update failed:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดต');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const handleDelete = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
      try {
        await UserService.remove(id);
        alert('ลบข้อมูลสำเร็จ');
        navigate('/users');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  if (!user) return <p className="text-center text-gray-500 mt-10">ไม่พบผู้ใช้</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">แก้ไขผู้ใช้</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="text-sm text-gray-600 mb-1">HN: <span className="font-bold">{user.id}</span></p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">ชื่อ</label>
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">นามสกุล</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">เบอร์โทรศัพท์</label>
          <input
            type="text"
            name="phone"
            value={user.phone || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">อีเมล</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-wrap justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            ลบ
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
