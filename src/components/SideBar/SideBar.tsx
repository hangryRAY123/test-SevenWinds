import "./SideBar.style.scss";
import arrow from "../../assets/icons/arrow.svg";
import grid from "../../assets/icons/grid.svg";

const SideBar = () => {
  const projects = [
    "По проекту",
    "Обьекты",
    "РД",
    "МТО",
    "СМР",
    "График",
    "МиМ",
    "Рабочие",
    "Капвложения",
    "Бюджет",
    "Финансирование",
    "Панорамы",
    "Камеры",
    "Поручения",
    "Контрагенты",
  ];

  return (
    <aside className="side_bar">
      <div className="side_bar__header">
        <h2 className="side_bar__title">
          Название проекта <small>Аббревиаткра</small>
        </h2>
        <button type="button">
          <img src={arrow} alt="arrow" />
        </button>
      </div>

      <nav>
        <ul className="side_bar__nav">
          {projects.map((project, i) => (
            <li key={i}>
              <a
                className={project == "СМР" ? "active" : undefined}
                href={`#${project.toLowerCase()}`}
              >
                <img src={grid} width="22" height="22" alt={project} />
                <span>{project}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
