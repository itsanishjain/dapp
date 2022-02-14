import React from 'react'

export default function ListItem({imageUrl,name,email}) {
  return (
    <div className='sm:flex space-x-6 mb-4 overflow-hidden'>
        <img className='w-12 h-12 rounded-full'  src={imageUrl} alt='user' />
        <div className=''>
            <p className='text-sm font-small text-slate-900'>{name}</p>
            <p className='text-sm text-slate-600 truncate'>{email}</p>
        </div>
    </div>

  )
}
