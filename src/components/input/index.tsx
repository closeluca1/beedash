interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  onChange: any;
}

export function Input({ label, type, placeholder, onChange }: InputProps) {
  return (
    <div className='grid w-full md:max-w-sm'>
      <label className='text-base font-medium'>{ label }:</label>
      <input
        className='h-10 rounded-md outline-none indent-5 mb-3'
        type={type}
        placeholder={placeholder}
        required
        onChange={onChange}
        minLength={5}
        maxLength={50}
      />
    </div>
  )
}