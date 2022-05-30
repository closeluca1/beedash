interface InputProps {
  label: string;
  type: string | any;
  placeholder: string;
  onChange: any;
  pattern: string;
  maxLength: any;
  title: string;
}

export function Input({ label, type, placeholder, onChange, pattern, maxLength, title }: InputProps) {

  return (
    <div className='grid w-full md:max-w-sm'>
      <label className='text-base font-medium'>{ label }:</label>
      <input
        className='h-10 rounded-md outline-none indent-5 mb-3 focus:invalid:border-2 focus:invalid:border-red-500'
        type={type}
        placeholder={placeholder}
        required
        onChange={onChange}
        minLength={3}
        maxLength={maxLength}
        autoComplete="false"
        pattern={pattern}
        title={title}
      />
    </div>
  )
}