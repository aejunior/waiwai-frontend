// components/MessageBox.tsx
import React, { useEffect, useState } from 'react';

const MessageBox: React.FC = () => {
    const [progress, setProgress] = useState(100); 
    const [visible, setVisible] = useState(true); 

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 1 : 0));
        }, 50);

        const timeout = setTimeout(() => {
            setVisible(false); 
        }, 5000); 

        return () => {
            clearInterval(interval); 
            clearTimeout(timeout); 
        };
    }, []);

    return (
        <div
            className={`fixed left-1/2 top-24 z-10 transform -translate-x-1/2 max-w-[1400px] w-full transition-opacity duration-500 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`} 
        >
            <div className="relative md:ml-24 lg:ml-0 p-4 text-white text-start w-[400px] bg-success rounded-t-lg h-full">
                
                Texto da mensagem

                {/* Barra de progresso */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 ">
                    <div
                        className="h-full bg-black rounded-b-lg transition-all duration-500"
                        style={{ width: `${progress}%` }} // Progress bar decreases with time
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
