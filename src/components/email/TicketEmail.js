import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const TicketEmail = () => {
  const form = useRef();
  const [toEmail, setToEmail] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    
    const emailParams = {
      toemail: toEmail, 
    };

    emailjs
      .send('service_lh3hv83', 'template_rrt2tnf', emailParams, 'LKfTopoKtQRSRQg5i')
      .then((result) => {
        toast.success("Gửi mail thành công !");
      })
      .catch((error) => {
        toast.warning("Gửi mail không thành công !");
      });
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="Nhập địa chỉ email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi mail</button>
      </form>
    </div>
  );
};

export default TicketEmail;
