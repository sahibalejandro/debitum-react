export interface Payment {
  title: string;
  amount: number;
  dueDate: string;
  repeatInterval: string | null;
  repeatDesignator: string | null;
  createdAt: Date;
  updatedAt: Date;
};
