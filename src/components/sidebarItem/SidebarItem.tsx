import { NavLink } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

export type SidebarItemProps = {
  text: string;
  to: string;
}
function SidebarItem({text, to}: SidebarItemProps) {
  return (
    <StyleLi>
      <NavLink activeClassName='is-active' className="style-navlink" to={to}>
        ▶ <span>{text}</span>
      </NavLink>
    </StyleLi>
  )
}


const StyleLi = styled.li`
  cursor: pointer;
  .style-navlink {
    border-radius: 0.5rem;
    height: 3.75rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    text-decoration: none;
    color: #000000;
    span {
      margin-left: 8px;
      font-size: 18px;
    }
  }
  .is-active {
    background-color: ${palette.main2};
    color: white;
    font-weight: bold;
  }
`;

export default SidebarItem;