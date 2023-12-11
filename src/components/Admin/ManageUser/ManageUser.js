import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchAdmin from "../search.js/SearchAdmin";
import Pagination from "../../Pagination/Pagination";

const ManageUser = () => {
  const [listUser, setListUser] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const getDataUser = async () => {
    const response = await axios.get("https://r636qt-3000.csb.app/users");
    if (response.status === 200) {
      setListUser(response.data);
      setUsers(response.data);
      setMaxPage(Math.ceil(response.data.length / itemsPerPage));
    }
  };

  const getRolesList = async () => {
    const response = await axios.get("https://r636qt-3000.csb.app/roles");
    if (response.status === 200) {
      setRolesList(response.data);
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    const roleIdAsNumber = parseInt(newRoleId, 10);
    await axios.patch(`https://r636qt-3000.csb.app/users/${userId}`, {
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
    setCurrentPage(1);
    setMaxPage(Math.ceil(filteredUsers.length / itemsPerPage));
  };

  useEffect(() => {
    getDataUser();
    getRolesList();
  }, []);

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedUsers = listUser.slice(firstItem, lastItem);

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
      <div className="px-4">
        <table className="mt-4 w-full border-collapse border-b border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border-b text-left ">STT</th>
              <th className="p-2 border-b text-left  font-semibold">Email</th>
              <th className="p-2 border-b text-left font-semibold">Họ tên</th>
              <th className="p-2 border-b text-left font-semibold">Mật khẩu</th>
              <th className="p-2 border-b text-left "></th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="p-2 border-b ">{firstItem + index + 1}</td>
                <td className="p-2 border-b font-semibold text-xl">
                  {user.email}
                </td>
                <td className="p-2 border-b font-semibold text-xl">
                  {user.fullname}
                </td>
                <td className="p-2 border-b font-semibold text-xl">
                  {user.password}
                </td>
                <td className="p-2 border-b ">
                  <select
                    className="bg-inherit outline-none "
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={listUser.length}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default ManageUser;
