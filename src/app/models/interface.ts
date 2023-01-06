export interface ClockData {
  items: ClockCircle[];
  type: 'hour' | 'minute' | 'second';
}
export interface ClockCircle {
  angle: number;
  value?: string;
  items?: string[];
  type: 'number' | 'dash';
}
export enum ClockHours {
  'val0' = '12',
  'val3' = '3',
  'val6' = '6',
  'val9' = '9'
}
export enum ClockMinute {
  'val0' = '60',
  'val5' = '05',
  'val10' = '10',
  'val15' = '15',
  'val20' = '20',
  'val25' = '25',
  'val30' = '30',
  'val35' = '35',
  'val40' = '40',
  'val45' = '45',
  'val50' = '50',
  'val55' = '55'
};