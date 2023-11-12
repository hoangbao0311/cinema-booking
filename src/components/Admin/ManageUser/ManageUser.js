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
    const response = await axios.get("http://localhost:3004/users");
    if (response.status === 200) {
      setListUser(response.data);
      setUsers(response.data);
      setMaxPage(Math.ceil(response.data.length / itemsPerPage));
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
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between items-center gap-5 ">
          <div className="">STT</div>
          <div className="flex-1 font-semibold text-xl">Email</div>
          <div className="flex-1 font-semibold text-xl">Họ tên</div>
          <div className="flex-1 font-semibold text-xl">Mật khẩu</div>
          <div className=""></div>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {displayedUsers.map((user, index) => (
          <div key={user.id}>
            <div className="flex justify-between items-center gap-5 border-b border-slate-500 py-2">
              <div className="">{firstItem + index + 1}</div>
              <div className="flex-1 font-semibold text-xl">{user.email}</div>
              <div className="flex-1 font-semibold text-xl">
                {user.fullname}
              </div>
              <div className="flex-1 flex-1font-semibold text-xl">
                {user.password}
              </div>
              <div className="">
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
              </div>
            </div>
          </div>
        ))}
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
