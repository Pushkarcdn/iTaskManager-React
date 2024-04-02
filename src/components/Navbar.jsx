import React from 'react'

function Navbar() {
    return (
        <>

            <nav>
                <ul className='flex justify-between px-7 py-4 sm:py-5 bg-purple-800 text-white'>
                    <li className='font-bold tracking-wider'>iTask Manager</li>
                    <li className='tracking-wider'>Home</li>
                </ul>
            </nav>


        </>
    )
}

export default Navbar