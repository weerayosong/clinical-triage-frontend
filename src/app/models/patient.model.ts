export interface Patient {
  id?: number;
  name: string;
  symptoms: string;
  urgency: 'NORMAL' | 'URGENT' | 'EMERGENCY';
  status?: 'WAITING' | 'IN_TREATMENT' | 'DISCHARGED';
  registeredAt?: string;
}
