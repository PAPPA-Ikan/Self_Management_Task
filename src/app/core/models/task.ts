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
    user_id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: TaskCategory;
    due_date: string | null;
    createdAt: string;
    updated_at: string;
}