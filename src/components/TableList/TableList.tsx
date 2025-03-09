import React, { useState } from "react";
import styled from "styled-components";
import "./TableList.style.scss";
import { RowItem, FormData } from "../../types";
import doc from "../../assets/icons/doc.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { defaultData } from "../../constants";

interface MultiLevelListProps {
  items: RowItem[];
  onDeleteRow: (id: number) => void;
  onAddRow: (parentId?: number) => void;
  onCreateRow: (data: FormData) => void;
  onUpdateRow: (id: number, data: FormData) => void;
  editableFormId: number | null;
  setEditableFormId: (id: number | null) => void;
  level?: number;
}

const StyledItem = styled.li<{ level: number }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &:before {
    position: absolute;
    content: ${({ level }) => (level === 1 ? "" : '""')};
    left: ${({ level }) => level * 15}px;
    top: -30px;
    width: 1px;
    height: 100%;
    background-color: #c6c6c6;
  }
`;

const TableList: React.FC<MultiLevelListProps> = ({
  items,
  onDeleteRow,
  onAddRow,
  onCreateRow,
  onUpdateRow,
  editableFormId,
  setEditableFormId,
  level = 1,
}) => {
  const [editableItems, setEditableItems] = useState<{
    [key: number]: RowItem;
  }>({});

  function handleDoubleClick(id: number) {
    setEditableFormId(id);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    item: RowItem
  ) {
    const { name, value } = event.target;

    setEditableItems((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        [name]: name === "rowName" ? value : parseFloat(value),
      },
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    item: RowItem
  ) {
    event.preventDefault();

    const formData = {
      ...defaultData,
      equipmentCosts: item.equipmentCosts,
      estimatedProfit: item.estimatedProfit,
      overheads: item.overheads,
      rowName: item.rowName,
      salary: item.salary,
      ...(item.parentId !== undefined && { parentId: item.parentId }),
    };

    const editedItem = editableItems[item.id];
    if (editedItem) {
      formData.rowName = editedItem.rowName || item.rowName;
      formData.salary = editedItem.salary || item.salary;
      formData.equipmentCosts =
        editedItem.equipmentCosts || item.equipmentCosts;
      formData.overheads = editedItem.overheads || item.overheads;
      formData.estimatedProfit =
        editedItem.estimatedProfit || item.estimatedProfit;
    }

    if ("child" in item) {
      onUpdateRow(item.id, formData);
      setEditableFormId(null);
    } else {
      onCreateRow(formData);
      setEditableFormId(null);
    }
  }

  return (
    <ul className="table_list">
      {items.map((item, i) => (
        <StyledItem level={level} key={i}>
          <div
            style={{ paddingLeft: `${level * 15}px` }}
            className="table_list__inner"
          >
            <div
              className={`table_list__btn ${
                level === 1 ? "table_list__btn--level" : ""
              }`}
            >
              <button
                className="table_list__btn_add"
                onClick={() => onAddRow(item.id)}
                type="button"
                disabled={editableFormId === item.id}
              >
                <img src={doc} width="16" height="16" alt="icon" />
              </button>
              <button
                className="table_list__btn_delete"
                onClick={() => onDeleteRow(item.id)}
                type="button"
                disabled={editableFormId === item.id}
              >
                <img src={deleteIcon} width="16" height="16" alt="icon" />
              </button>
            </div>
            <form
              className="table_list__form"
              onSubmit={(e) => handleSubmit(e, item)}
              onDoubleClick={() => handleDoubleClick(item.id)}
            >
              <input
                type="text"
                onChange={(e) => handleInputChange(e, item)}
                value={editableItems[item.id]?.rowName || item.rowName}
                name="rowName"
                readOnly={editableFormId !== item.id}
                autoComplete="off"
              />
              <input
                type="text"
                onChange={(e) => handleInputChange(e, item)}
                value={editableItems[item.id]?.salary || item.salary}
                name="salary"
                readOnly={editableFormId !== item.id}
              />
              <input
                type="text"
                onChange={(e) => handleInputChange(e, item)}
                value={
                  editableItems[item.id]?.equipmentCosts || item.equipmentCosts
                }
                name="equipmentCosts"
                readOnly={editableFormId !== item.id}
              />
              <input
                type="text"
                onChange={(e) => handleInputChange(e, item)}
                value={editableItems[item.id]?.overheads || item.overheads}
                name="overheads"
                readOnly={editableFormId !== item.id}
              />
              <input
                type="text"
                onChange={(e) => handleInputChange(e, item)}
                value={
                  editableItems[item.id]?.estimatedProfit ||
                  item.estimatedProfit
                }
                name="estimatedProfit"
                readOnly={editableFormId !== item.id}
              />
              <button className="visually_hidden" type="submit">
                Сохранить
              </button>
            </form>
          </div>
          {item.child && item.child.length > 0 && (
            <TableList
              items={item.child}
              onDeleteRow={onDeleteRow}
              onAddRow={onAddRow}
              onCreateRow={onCreateRow}
              onUpdateRow={onUpdateRow}
              editableFormId={editableFormId}
              setEditableFormId={setEditableFormId}
              level={level + 1}
            />
          )}
        </StyledItem>
      ))}
    </ul>
  );
};

export default TableList;
