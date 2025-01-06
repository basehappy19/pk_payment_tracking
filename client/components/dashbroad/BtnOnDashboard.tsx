import React from 'react'

export const ThreeDotIcon = () => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  )
}

export const BtnBack = () => {
  return (
    <div>
      <a href="./"><ArrowLeft/></a>
    </div>
  )
}

export const ArrowLeft = () => {
  return (
    <div>
      <svg  xmlns="http://www.w3.org/2000/svg"  width="50"  height="50"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  
      className="p-2 bg-white dark:bg-black dark:shadow-gray-600 rounded-lg my-1 shadow-md icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l14 0" />
      <path d="M5 12l6 6" />
      <path d="M5 12l6 -6" />
    </svg>
    </div>
  )
}

export const NavigationBtn = () => {
  return (
    <div>NavigationBtn</div>
  )
}

