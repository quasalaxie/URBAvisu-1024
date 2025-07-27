import React from 'react'

const Logo = ({ height = 40 }) => {
  const width = (height / 32) * 200

  return (
    <div className="flex items-center">
      {/* Drapeau suisse - réduit et aligné avec le U */}
      <div className="mr-2">
        <div className="w-6 h-6 bg-red-600 flex items-center justify-center rounded-sm">
          <div className="text-white font-bold text-sm leading-none">+</div>
        </div>
      </div>
      
      {/* Texte URBAvisu */}
      <div className="flex items-baseline">
        <span className="text-black font-bold text-2xl tracking-tight">URBA</span>
        <span className="text-black font-normal text-xl tracking-tight">visu</span>
      </div>
    </div>
  )
}

export default Logo