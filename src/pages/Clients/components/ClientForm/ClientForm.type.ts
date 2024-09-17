export interface ClientFormProps {
  onSuccess: () => void;
  initialValues?: {
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
  };
  onEdit?: boolean;
}
