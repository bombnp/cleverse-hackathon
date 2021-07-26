import React from 'react';

export const GoogleMapHospitelFilterBox = () => {
    return (
        <div className="w-96 h-96 pr-20">
            <div className="bg-red-400 px-6 py-2 rounded-t-2xl w-24 ml-auto mr-2"> i filter </div>
            <div className="bg-red-500 p-4 rounded-2xl w-auto">
                <div className="flex justify-start align-top gap-2">
                    <span className="bg-gray-400 rounded-xl px-2 py-1"> i ว่างมาก </span>
                    <span className="bg-gray-400 rounded-xl px-2 py-1"> i ว่างมาก </span>
                    <span className="bg-gray-400 rounded-xl px-2 py-1"> i ว่างมาก </span>
                </div>
                <div className="mt-2 flex justify-start align-top gap-2">
                    <span className="bg-gray-400 rounded-xl px-2 py-1"> เลือกจังหวัด i </span>
                    <span className="bg-gray-400 rounded-xl px-2 py-1"> เลือกจังหวัด i </span>
                </div>
                <div className="flex w-64 m-auto items-center h-32 justify-center">
                    <div className="py-1 relative min-w-full ml-9">
                        <div className="absolute text-gray-800 top-0 left-0 -mt-6 -ml-10">ราคา</div>
                        <div className="absolute text-gray-800 -ml-1 top-0 left-0 -mt-6">
                            <input type="text" placeholder="10" className="outline-none focus:outline-none text-center w-12 bg-gray-300 font-semibold text-md text-gray-700" />
                        </div>
                        <div className="absolute text-gray-800 -mr-1 top-0 right-0 -mt-6">
                            <input type="text" placeholder="150" className="outline-none focus:outline-none text-center w-12 bg-gray-300 font-semibold text-md text-gray-700" />
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div className="absolute h-2 rounded-full bg-teal-600 w-0"></div>
                            <div className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer" unselectable="on" style={{ left: '58.5714%' }}>
                                <div className="relative -mt-2 w-1">
                                    <div className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full" style={{ marginLeft: '-20.5px' }}>
                                        <div className="relative shadow-md">
                                            <div className="bg-gray-400 -mt-8 text-white truncate text-xs rounded py-1 px-4">92</div>
                                            <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                                                <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}