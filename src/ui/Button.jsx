/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';

const Button = ({ type, children, ...restProps }) => (
    <button
        {...restProps}
        type={type}
        className="bg-indigo-500/20 px-4 py-2 text-lg rounded-md font-semi-bold hover:bg-indigo-50 disabled:bg-rose-400"
    >
        {children}
    </button>
);

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;
