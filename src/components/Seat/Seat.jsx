import React from 'react'

const Seat = ({number,person}) => {
  return (
    <div className="border rounded-xl p-2 w-60 h-20 flex flex-col items-center font-bold justify-center text-lg shadow">
      <p className="text-xl text-primary">{number}</p>
      <p>{person}</p>
    </div>
  )
}

export default Seat
