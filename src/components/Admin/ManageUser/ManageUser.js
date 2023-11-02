import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchAdmin from "../search.js/SearchAdmin";

const ManageUser = () => {
  const [listUser, setListUser] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const getDataUser = async () => {
    const response = await axios.get("http://localhost:3004/users");
    if (response.status === 200) {
      setListUser(response.data);
      setUsers(response.data);
    }
  };

  const getRolesList = async () => {
    const response = await axios.get("http://localhost:3004/roles");
    if (response.status === 200) {
      setRolesList(response.data);
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    const roleIdAsNumber = parseInt(newRoleId, 10);
    await axios.patch(`http://localhost:3004/users/${userId}`, {
      rolesId: roleIdAsNumber,
    });
    getDataUser();
  };
  const handleSearch = () => {
    const filteredUsers = users.filter((user) => {
      const searchString = user.email.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setListUser(filteredUsers);
  };

  useEffect(() => {
    getDataUser();
    getRolesList();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Quản lí User</div>
        <SearchAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div></div>
      </div>
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
                      <option
                        className="text-black"
                        key={role.id}
                        value={role.id}
                      >
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
