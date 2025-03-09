import "./SubMenu.style.scss";
import tile from "../../assets/icons/tile.svg";
import cancel from "../../assets/icons/cancel.svg";

const SubMenu = () => {
  const items = [tile, cancel];

  return (
    <ul className="sub_menu">
      {items.map((item, i) => (
        <li key={i}>
          <button type="button">
            <img src={item} width="24" height="24" alt="icon" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
