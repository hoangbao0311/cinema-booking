import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageUser = () => {
  const [listUser, setListUser] = useState([]);
  const [rolesList, setRolesList] = useState([]);

  const getDataUser = async () => {
    const response = await axios.get("http://localhost:3004/users");
    if (response.status === 200) {
      setListUser(response.data);
    }
  };

  const getRolesList = async () => {
    const response = await axios.get("http://localhost:3004/roles");
    if (response.status === 200) {
      setRolesList(response.data);
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    const roleIdAsNumber = parseInt(newRoleId, 10); // Chuyển đổi thành số nguyên
    await axios.patch(`http://localhost:3004/users/${userId}`, {
      rolesId: roleIdAsNumber,
    });
    getDataUser();
  };

  useEffect(() => {
    getDataUser();
    getRolesList();
  }, []);

  return (
    <div>
      <div className="p-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border">
              <th>Username</th>
              <th>Điện thoại</th>
              <th>Mật khẩu</th>
              <th>Hành động</th>
            </tr>
          </thead>

          {listUser.map((user) => (
            <tbody key={user.id}>
              <tr className="border">
                <th>{user.email}</th>
                <th>{user.fullname}</th>
                <th>{user.password}</th>
                <th>
                  <select
                    className="bg-inherit"
                    value={user.rolesId}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {rolesList.map((role) => (
                      <option className="text-black" key={role.id} value={role.id}>
                        {role.value}
                      </option>
                    ))}
                  </select>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
