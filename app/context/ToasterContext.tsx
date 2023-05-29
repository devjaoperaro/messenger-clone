'use client'

import { Toaster } from "react-hot-toast";


const ToasterContext = () => {
    return (
        <Toaster 
            position="top-right"
            reverseOrder={false}
        />
    );
};

export default ToasterContext;