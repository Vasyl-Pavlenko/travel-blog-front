import React from 'react'
import Moment from 'react-moment'

export const CommentItem = ({ cmt  }) => {
  const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)

  return (
    <div className='flex items-center justify-between gap-3 rounded-lg'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
          {avatar}
        </div>

        <div className='flex flex-col text-gray-300 text-[14px]'>
          {cmt.comment}
          <div className='flex justify-between text-white opacity-60 text-[12px] pt-2'>
            <Moment
              date={cmt.createdAt}
              format='D MMM YY'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
