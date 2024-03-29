import React from "react";

export default function PopUp () {
    return <div className="w-[536px] h-[436px] absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-black bg-primary rounded-[15px] shadow-[15px_15px_6px_0_rgba(0,0,0,0.25)]">
        <div className="w-full h-[114px] bg-tertiary rounded-t-[15px]"></div>
        <div className="w-full px-[100px]"></div>
    </div>
}