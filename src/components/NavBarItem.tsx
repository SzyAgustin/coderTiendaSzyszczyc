import PropTypes from 'prop-types'
import './NavBarItem.css';

interface NavBarItemProps {
    children: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const NavBarItem = (props: NavBarItemProps) => {
    return (
        <div onClick={props.onClick} className='navbar-item'>{props.children}</div>
    )
}

export default NavBarItem
