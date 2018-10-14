import { TodoListComponent } from "./todo-list/todo-list.component";
import { AllTasksComponent } from "./all-tasks/all-tasks.component";

export const routes = [
      {
        path: '',
        component: TodoListComponent
      },
      {
        path: 'all-tasks',
        component: AllTasksComponent
      }
    ]
