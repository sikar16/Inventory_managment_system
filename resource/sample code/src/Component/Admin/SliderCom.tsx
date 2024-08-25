import React from 'react'
import chart from '../../assets/growth.png'

function SliderCom() {
    return (
        <>
            <div className='grid grid-cols-6 mb-5 gap-3 text-center align-middle items-center'>
                <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                    <div className="">
                        <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            All user
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                            123
                        </p>
                    </div>
                    <div>
                        <img src={chart} alt="" width={50} height={50} />
                    </div>

                </div>
                <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                    <div className="">
                        <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            Finance
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                            123
                        </p>
                    </div>
                    <div>
                        <img src={chart} alt="" width={50} height={50} />
                    </div>

                </div>
                <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                    <div className="">
                        <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            Human Resource
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                            123
                        </p>
                    </div>
                    <div>
                        <img src={chart} alt="" width={50} height={50} />
                    </div>

                </div>
                <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                    <div className="">
                        <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            Finance                            </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                            123
                        </p>
                    </div>
                    <div>
                        <img src={chart} alt="" width={50} height={50} />
                    </div>

                </div>


            </div>
        </>
    )
}

export default SliderCom