import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

SvgIconStyle.propTypes = {
  src: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function SvgIconStyle({ src, sx }) {
  return (
    <Box
      component="span"
    >
      <img src={src} alt="dummy" />
    </Box>
  );
}
