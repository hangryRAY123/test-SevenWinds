import "./Menu.style.scss";

const Menu = () => {
  const tabs = ["Просмотр", "Управление"];
  return (
    <ul className="menu">
      {tabs.map((tab, i) => (
        <li key={i}>
          <a
            className={i == 0 ? "active" : undefined}
            href={`/${tab.toLowerCase()}`}
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
