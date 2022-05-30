interface ButtonProps {
  onClick: any;
  title: string;
  disabled: any;
}

export function Button({ onClick, title, disabled }: ButtonProps) {
  return (
    <button
      className='bg-indigo-600 hover:bg-indigo-900 transition-all duration-200 text-zinc-50 rounded-md w-full md:max-w-sm h-10 mt-6 text-lg font-normal disabled:opacity-75 disabled:bg-indigo-900'
      onClick={onClick}
      disabled={disabled}
    >
      { title }
    </button>
  )
}