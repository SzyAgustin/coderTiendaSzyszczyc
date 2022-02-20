import styled from 'styled-components';

interface ButtonProps {
  heigth?: string;
  width?: string;
  primary?: boolean;
  marginTop?: number;
  fontSize?: number;
}

const Button = styled.button<ButtonProps>`
  margin-top: ${p => (p.marginTop || 0) + 'px'};
  border: none;
  height: ${(p) => p.heigth || '40px'};
  width: ${(p) => p.width || '100%'};
  border-radius: 5px;
  background-color: ${(p) => getBackgroundColor(p.disabled, p.primary)};
  color: ${(p) => getTextColor(p.disabled, p.primary)};
  cursor: pointer;
  transition: 0.1s;
  font-size: ${p => (p.fontSize || 16) + 'px'};;
  ${(p) => getBorder(p.disabled, p.primary)};

  &:hover {
    background-color: ${(p) => getBackgroundColor(p.disabled, p.primary, true)};
    ${(p) => getBorder(p.disabled, p.primary, true)};
    color: ${(p) => getTextColor(p.disabled, p.primary, true)};
    transition: 0.2s;
  }
`;

const getBackgroundColor = (
  disabled: boolean = false,
  primary: boolean = false,
  hover: boolean = false
) => {
  if (primary) {
    return disabled ? 'gray' : hover ? 'red' : 'rgb(185, 19, 19)';
  }
  return 'white';
};

const getBorder = (
  disabled: boolean = false,
  primary: boolean = false,
  hover: boolean = false
) => {
  if (primary) return '';
  const str = 'border: 2px solid ';
  if (disabled) {
    return str + 'gray';
  } else {
    return hover ? str + 'red' : str + 'rgb(185, 19, 19)';
  }
};

const getTextColor = (
  disabled: boolean = false,
  primary: boolean = false,
  hover: boolean = false
) => {
  if (primary) return 'white';
  if (disabled) {
    return 'gray';
  } else {
    return hover ? 'red' : 'rgb(185, 19, 19)';
  }
};

export default Button;
