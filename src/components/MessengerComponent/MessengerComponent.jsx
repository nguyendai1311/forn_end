import React, { useEffect } from 'react';

const MessengerComponent = () => {
  useEffect(() => {
    // Hàm khởi tạo SDK Facebook
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1310695939905368', // ID của ứng dụng Facebook
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v12.0',
      });

      // Parse lại các thành phần của Facebook sau khi SDK được tải
      window.FB.XFBML.parse();
    };

    // Tải SDK Facebook
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <div>
      <h1>Liên hệ với chúng tôi qua Messenger</h1>
      <div id="fb-root"></div>
      <div
        className="fb-messengermessageus"
        data-href="https://m.me/1310695939905368" // Thay ID trang tại đây
        data-width=""
        data-height=""
        data-color="#FFFFFF"
        data-size="large"
      />
    </div>
  );
};

export default MessengerComponent;
