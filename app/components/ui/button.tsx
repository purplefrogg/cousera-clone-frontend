interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'secondary'
}
const buttonThemes = {
  primary:
    'px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  secondary:
    'px-4 py-2 text-sm font-medium text-white bg-grey-400 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
}
export const Button = ({
  theme = 'primary',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={buttonThemes[theme]} {...props}>
      {children}
    </button>
  )
}
