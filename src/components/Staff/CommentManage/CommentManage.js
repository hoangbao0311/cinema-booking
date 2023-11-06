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
        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center gap-5 ">
            <div className="flex-1">STT</div>
            <div className="flex-1 font-semibold text-xl">Khách hàng</div>
            <div className="flex-1 font-semibold text-xl">Comment</div>
            <div className="flex-1 font-semibold text-xl">Đánh giá</div>
            <div className="flex-1 font-semibold text-xl">Ngày</div>
            <div className="flex-1 w-3"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          {currentItems.map((comment, index) => (
            <div className="flex items-center gap-5" key={comment.id}>
              <div className="flex-1">{index + 1 +firstItem}</div>
              <div className="flex-1 font-semibold text-xl">
                {comment.users.fullname}
              </div>
              <div className="flex-1 font-semibold text-xl">{comment.body}</div>
              <div className="flex-1 font-semibold text-xl">
                {comment.star} Sao
              </div>
              <div className="flex-1 font-semibold text-xl">{comment.date}</div>
              <div className="flex-1">
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="hover:bg-red-900 bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
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
