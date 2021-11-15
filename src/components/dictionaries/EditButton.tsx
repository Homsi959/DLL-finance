import { IconButton } from '@material-ui/core';
import { IconSprite } from 'components/icons/IconSprite';
import { palette } from 'theme';

export type EditButtonProps = {
  onClick: () => void;
};

export const EditButton = (props: EditButtonProps) => {
  const { onClick } = props;

  return (
    <IconButton aria-label="edit" onClick={onClick}>
      <IconSprite
        width="14px"
        color={palette.textGrey2.main}
        hoverColor={palette.primary.main}
        icon="edit"
      />
    </IconButton>
  );
};
