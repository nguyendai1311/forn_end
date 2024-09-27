import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons'; // Import icon từ Ant Design

const VoiceSearchComponent = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = 'vi-VN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onSearch(transcript);  // Gọi hàm tìm kiếm khi có kết quả giọng nói
  };

  recognition.onerror = (event) => {
    console.error('Lỗi nhận diện giọng nói: ', event.error);
    setIsListening(false);
  };

  return (
    <div>
      <AudioOutlined
        onClick={startListening}
        style={{ padding:'4px',fontSize: '22px', cursor: 'pointer', color: isListening ? 'black' : '#737880' }} // Thay đổi màu khi đang nghe
      />
    </div>
  );
};

export default VoiceSearchComponent;
