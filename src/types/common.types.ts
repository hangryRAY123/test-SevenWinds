export interface FormData {
  rowName: string;
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  salary: number;
  supportCosts: number;
}

export interface  RowItem extends FormData {
  id: number;
  parentId: number | null;
  child?: RowItem[];
}

export interface NewRow extends FormData {
  id: number;
  parentId: number | null;
}

