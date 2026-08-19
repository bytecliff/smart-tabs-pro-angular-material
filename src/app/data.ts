import { ReportCategory, ViewItem } from './models';

export const REPORT_CATEGORIES: readonly ReportCategory[] = [
  { id: 'order', label: 'Order Reports', icon: 'shopping_cart', reports: [
    { id: 'order-summary', label: 'Order Summary', count: 42 },
    { id: 'order-returns', label: 'Returns & Refunds', count: 12 },
    { id: 'order-fulfilment', label: 'Fulfilment SLA', count: 8 },
    { id: 'order-channels', label: 'Channel Breakdown', count: 5 }
  ]},
  { id: 'user', label: 'User Reports', icon: 'group', reports: [
    { id: 'user-activity', label: 'Active Users', count: 24 },
    { id: 'user-retention', label: 'Retention Cohorts', count: 9 },
    { id: 'user-permissions', label: 'Permission Audit', count: 4 }
  ]},
  { id: 'account', label: 'Account Reports', icon: 'apartment', reports: [
    { id: 'account-health', label: 'Account Health', count: 18 },
    { id: 'account-renewals', label: 'Renewals Pipeline', count: 11 },
    { id: 'account-usage', label: 'Usage by Account', count: 14 }
  ]}
];

export const VIEWS: readonly ViewItem[] = [
  { id: 'my-reports', label: 'My Reports', icon: 'description', count: 12 },
  { id: 'recently-used', label: 'Recently Used', icon: 'schedule', count: 8 },
  { id: 'finance-reports', label: 'Finance Reports', icon: 'account_balance_wallet', count: 16 },
  { id: 'contract-reports', label: 'Contract Reports', icon: 'file_copy', count: 6 },
  { id: 'billing-reports', label: 'Billing Reports', icon: 'receipt_long', count: 21 },
  { id: 'operational-reports', label: 'Operational Reports', icon: 'tune', count: 9 },
  { id: 'shared-reports', label: 'Shared Reports', icon: 'share', count: 4 },
  { id: 'revenue-reports', label: 'Revenue Reports', icon: 'bar_chart', count: 7 },
  { id: 'payment-reports', label: 'Payment Reports', icon: 'credit_card', count: 5 }
];
