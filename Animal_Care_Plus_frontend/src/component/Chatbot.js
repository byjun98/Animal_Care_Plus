import React, { useState, useEffect, useRef } from 'react';
import './chatbotstyle.css';

function Chatbot({ initialMessage }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (initialMessage) {
            setMessages([{ role: 'assistant', content: initialMessage }]);
        }
    }, [initialMessage]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // 간단한 응답 로직 (실제 AI API 연동은 별도 설정 필요)
            const response = `"${input}"에 대한 답변입니다. 이 기능은 AI API 키가 설정되어야 정상 작동합니다. 현재 로컬 데모 모드입니다.`;

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: '오류가 발생했습니다. 다시 시도해주세요.' }]);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chatDiv">
            <div>
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.role === 'user' ? '🧑 ' : '🐶 '}</strong>
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="loadingMessage">
                        답변을 생성 중입니다...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="inputContainer">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                />
                <button onClick={handleSend}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
