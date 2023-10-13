import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API để kiểm tra email
      const response = await axios.get(`http://localhost:3004/users?email=${email}`);
      const userData = response.data[0]; // Giả sử API trả về một mảng dữ liệu

      if (userData) {
        setMessage(`Yêu cầu quên mật khẩu đã được gửi đến ${email}`);
      } else {
        setMessage(`Email không tồn tại.`);
      }
    } catch (error) {
      console.error(error); 
      setMessage(`Đã xảy ra lỗi khi kiểm tra email.`);
    }
  };

  return (
    <div className="App">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi mã xác nhận</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
