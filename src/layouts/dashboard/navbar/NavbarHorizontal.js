import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, AppBar, Stack } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: 'auto',
  position: 'fixed',
  marginTop: '8px',
  left: 'auto',
  right: 'auto',
  borderRadius: '7px',
  boxShadow: '0px -3px 20px rgba(0, 0, 0, 0.3)',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  return (
    <Stack sx={{    
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <RootStyle>
        <Container  maxWidth={false}>
          <NavSectionHorizontal navConfig={navConfig} />
        </Container>
      </RootStyle>
    </Stack>
  );
}

export default memo(NavbarHorizontal);
