import "./Table.style.scss";
import TableList from "../TableList";
import { useState, useEffect } from "react";
import { outlayRowsApi } from "../../api";
import { RowItem, NewRow, FormData } from "../../types";
import { defaultData } from "../../constants";
import { AxiosError } from "axios";

const Table = () => {
  const [treeRows, setTreeRows] = useState<RowItem[]>([]);
  const [editableFormId, setEditableFormId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const headerItems = [
    "Уровень",
    "Наименование работ",
    "Основная з/п",
    "Оборудование",
    "Накладные расходы",
    "Сметная прибыль",
  ];

  async function handleNewRow() {
    const newRow: NewRow = {
      id: Date.now(),
      parentId: null,
      ...defaultData,
    };

    setTreeRows((prevRows) => [...prevRows, newRow]);
    setEditableFormId(newRow.id);
  }

  async function handleDeleteRow(id: number) {
    try {
      await outlayRowsApi.deleteRow(id);
      const rows = await outlayRowsApi.getTreeRows();
      setTreeRows(rows);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.message || "Failed to delete row. Please try again later."
        );
      }
    }
  }

  async function handleUpdateRow(id: number, data: FormData) {
    try {
      await outlayRowsApi.updateRow(id, data);
      const rows = await outlayRowsApi.getTreeRows();
      setTreeRows(rows);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.message || "Failed to update row. Please try again later."
        );
      }
    }
  }

  async function handleCreateRow(data: FormData) {
    try {
      await outlayRowsApi.createRowInEntity(data);
      const rows = await outlayRowsApi.getTreeRows();
      setTreeRows(rows);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.message || "Failed to create row. Please try again later."
        );
      }
    }
  }

  function handleAddRow(parentId?: number) {
    const newRow: NewRow = {
      id: Date.now(),
      parentId: parentId || null,
      ...defaultData
    };

    setTreeRows((prevRows) => {
      if (parentId) {
        const addRowRecursively = (rows: RowItem[]): RowItem[] => {
          return rows.map((row) => {
            if (row.id === parentId) {
              return {
                ...row,
                child: row.child ? [...row.child, newRow] : [newRow],
              };
            } else if (row.child) {
              return {
                ...row,
                child: addRowRecursively(row.child),
              };
            }
            return row;
          });
        };

        return addRowRecursively(prevRows);
      } else {
        return [...prevRows, newRow];
      }
    });

    setEditableFormId(newRow.id);
  }

  useEffect(() => {
    const fetchTreeRows = async () => {
      try {
        const rows = await outlayRowsApi.getTreeRows();

        setTreeRows(rows);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(
            error.message ||
              "Failed to fetch tree rows. Please try again later."
          );
        }
      }
    };

    fetchTreeRows();
  }, []);

  return (
    <section className="table">
      <div className="table__title">
        <h2>Строительно-монтажные работы</h2>
      </div>
      <div className="table__container">
        <ul className="table__header">
          {headerItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <TableList
          items={treeRows}
          onDeleteRow={handleDeleteRow}
          onAddRow={handleAddRow}
          onCreateRow={handleCreateRow}
          onUpdateRow={handleUpdateRow}
          editableFormId={editableFormId}
          setEditableFormId={setEditableFormId}
        />
        <button className="table__btn" type="button" onClick={handleNewRow}>
          Добавить новую строку
        </button>
      </div>
      {error && <p className="table__error">{error}</p>}
    </section>
  );
};

export default Table;
