import React from 'react'

function Loading() {
    return (
        <>
            <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                <span className="text-4xl font-medium text-gray-500">Loading...</span>
            </div>
        </>
    )
}

export default Loading