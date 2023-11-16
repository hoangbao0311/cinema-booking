import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SearchStaff from "../SearchStaff/SearchStaff";
import Pagination from "../../Pagination/Pagination";

const CommentManage = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const getComments = async () => {
    const response = await axios.get(
      "http://localhost:3004/comments?_expand=users"
    );
    if (response.status === 200) {
      const sortedComments = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setComments(sortedComments);
      setMaxPage(Math.ceil(sortedComments.length / itemsPerPage));
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults(sortedComments);
      }
    }
  };

  const handleDeleteComment = async (id) => {
    const response = await axios.delete(`http://localhost:3004/comments/${id}`);
    getComments(response.data);
    toast.success("Xóa thành công !");
  };

  const handleSearch = () => {
    const filteredComments = comments.filter((comment) => {
      const searchString =
        comment.users.fullname.toLowerCase() +
        comment.body.toLowerCase() +
        comment.date.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredComments);
    setMaxPage(Math.ceil(filteredComments.length / itemsPerPage));
  };

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const currentItems = searchResults.slice(firstItem, lastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-between p-3 border-b-4 border-[#151929]">
          <div className="p-3 font-semibold text-xl">Quản lý bình luận</div>
          <SearchStaff
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
                <th className="p-2 border-b text-left">STT</th>
                <th className="p-2 border-b text-left font-semibold text-xl">
                  Khách hàng
                </th>
                <th className="p-2 border-b text-left font-semibold text-xl">
                  Comment
                </th>
                <th className="p-2 border-b text-left font-semibold text-xl">
                  Đánh giá
                </th>
                <th className="p-2 border-b text-left font-semibold text-xl">
                  Ngày
                </th>
                <th className="p-2 border-b text-left"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((comment, index) => (
                <tr key={comment.id}>
                  <td className="p-2 border-b">{index + 1 + firstItem}</td>
                  <td className="p-2 border-b font-semibold text-xl">
                    {comment.users.fullname}
                  </td>
                  <td className=" flex-1 border-b font-semibold text-xl">
                    {comment.body}
                  </td>
                  <td className="p-2 border-b font-semibold text-xl">
                    {comment.star} Sao
                  </td>
                  <td className="p-2 w-36 border-b font-semibold text-xl">
                    {comment.date}
                  </td>
                  <td className="p-2 border-b text-right">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="hover:bg-red-900 bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={searchResults.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CommentManage;
