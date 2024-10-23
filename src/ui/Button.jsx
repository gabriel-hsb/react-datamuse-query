const Button = ({ type, children, ...restProps }) => (
  <button
    {...restProps}
    type={type}
    className="bg-[#cca537] px-4 py-2 text-lg rounded-md font-semi-bold hover:bg-[#cca537]/50 disabled:bg-rose-400"
  >
    {children}
  </button>
);

export default Button;
