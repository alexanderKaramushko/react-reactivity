export type ClickCounterProps = {};

export interface ClickCounterState {
  count: number;
}

export interface UpdateButtonProps {
  disabled?: boolean;
  onClick: () => void;
}
