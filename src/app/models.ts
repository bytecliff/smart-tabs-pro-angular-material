export interface ReportItem { id: string; label: string; count: number; }
export interface ReportCategory { id: string; label: string; icon: string; reports: ReportItem[]; }
export interface ViewItem { id: string; label: string; icon: string; count: number; }
export interface PinnedTab { value: string; label: string; icon: string; count?: number; }
