const Button = ({ type, children, ...restProps }) => (
  <button
    {...restProps}
    type={type}
    className="bg-gold px-4 py-2 text-lg rounded-md font-semi-bold hover:bg-gold/50 disabled:bg-gold/10"
  >
    {children}
  </button>
);

export default Button;
