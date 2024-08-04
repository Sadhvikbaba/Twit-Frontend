import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gradient-to-r from-red-300 via-red-500 to-red-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 hover:text-red-800 rounded-lg ${bgColor} ${textColor} ${className} hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-2xl shadow-red-800 font-medium me-2 mb-2`} {...props}>
            {children}
        </button>
    );
}