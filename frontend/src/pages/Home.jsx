import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/user.service';

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        UserService.get().then(response => {
            setUsers(response.data);
        }).catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h1>
        <hr className="mb-4" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <p className="font-medium">ค้นหาเจ้าของ</p>
            <input type="text" placeholder="ค้นหาผู้ใช้" className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ค้นหา
            </button>
            </div>
            <button onClick={() => navigate('/users/add')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            เพิ่มผู้ใช้
            </button>
        </div>

        <hr className="mb-4" />

        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                <th className="border px-4 py-2 text-left">Operation</th>
                <th className="border px-4 py-2 text-left">HN เจ้าของ</th>
                <th className="border px-4 py-2 text-left">ชื่อเจ้าของ</th>
                <th className="border px-4 py-2 text-left">เบอร์ติดต่อ</th>
                <th className="border px-4 py-2 text-left">อีเมล</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                    <button
                        onClick={() => navigate(`/users/edit/${user.id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                        แก้ไข
                    </button>
                    </td>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name} {user.lastname}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default Home;
