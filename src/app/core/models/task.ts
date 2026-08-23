export type TaskStatus =
    | 'todo'
    | 'in-progress'
    | 'done';

export type TaskPriority =
    | 'low'
    | 'medium'
    | 'high';

export type TaskCategory = 
    | 'work'
    | 'personal'
    | 'learning'
    | 'other';

export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: TaskCategory;
    dueDate: string | null;
    createdAt: string;
}