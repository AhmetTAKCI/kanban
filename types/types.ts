export interface Task {
    id: string;
    status: string;
    name: string;
    color: string
  
  }
  
  export interface BoardTypes {
    tasks: Task[];
    id: string;
    name: string
  }