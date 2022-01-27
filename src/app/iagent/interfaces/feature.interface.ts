export interface Feature {
    id: number;
    name: string;
    icon: string;
    quantity?: number;
    styleActive?: boolean;
    multiple?: boolean;
    isSelected?: boolean;
}