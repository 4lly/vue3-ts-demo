export interface IToDo {
  id: number;
  content: string;
  status: TODO_STATUS;
}

export interface ISTATUS {
  list: IToDo[];
}

export enum TODO_STATUS {
  WILLDO = "willdo",
  DIING = "doing",
  FINISHED = "finished",
}

export interface demoState {
  userName: string;
}
