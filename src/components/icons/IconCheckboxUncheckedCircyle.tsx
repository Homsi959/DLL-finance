import { palette } from 'theme';

export type IconCheckboxUncheckedCircyleProps = {
  disabled: boolean;
};

export const IconCheckboxUncheckedCircyle = (props: IconCheckboxUncheckedCircyleProps) => {
  const { disabled } = props;
  const colorDisabled = palette.secondary.dark;

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 9C18 13.9747 13.9741 18 9 18C4.02525 18 0 13.9741 0 9C0 4.02525 4.02594 0 9 0C13.9747 0 18 4.02594 18 9ZM16.5938 9C16.5938 4.80254 13.1969 1.40625 9 1.40625C4.80254 1.40625 1.40625 4.80309 1.40625 9C1.40625 13.1975 4.80309 16.5938 9 16.5938C13.1975 16.5938 16.5938 13.1969 16.5938 9Z"
        fill={disabled ? colorDisabled : palette.primary.main}
      />
    </svg>
  );
};
