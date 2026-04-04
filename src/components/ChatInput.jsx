import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages}) {
        const [inputText, setInputText] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        function saveInputText (event) {
            setInputText(event.target.value);
        }

        async function sendMessage() {
            if(isLoading || inputText ==='') {
                return;
            }
            setIsLoading(true);
            setInputText('');

            const newChatMessages= [
                ...chatMessages,
                {
                    message: inputText,
                    sender: 'user',
                    id: crypto.randomUUID(),
                    time: dayjs().valueOf()
                }
            ]; 

            setChatMessages ([
                ...newChatMessages,
                {
                    
                    message: <img src={LoadingSpinner} 
                                  className="loading-spinner" 
                            />,
                    sender: 'robot',
                    id: crypto.randomUUID()
                }
            ]);

            const response = await Chatbot.getResponseAsync(inputText);
            setChatMessages([
                ...newChatMessages,
                {
                    message: response,
                    sender: 'robot',
                    id: crypto.randomUUID(),
                    time: dayjs().valueOf()
                }
            ]);
            
            setIsLoading(false);
        }

        function keyDown (event){
            if(event.key === 'Enter'){
                sendMessage();
            }
            else if (event.key === 'Escape') {
                setInputText('');
            }
        }

        function clearMessages() {
            setChatMessages([]);
        }

        return (
        <div className="chat-input-container">
            <input 
                placeholder ="Send a message to Chatbot" 
                width= "40" 
                onChange={saveInputText}
                value={inputText}
                onKeyDown={keyDown}
                className="textbox"
            />
            <button 
                onClick={sendMessage}
                className="send-button"
            >Send</button>
            <button 
                onClick={clearMessages}
                className="clear-button"
            >Clear</button>
        </div>
        );
    }