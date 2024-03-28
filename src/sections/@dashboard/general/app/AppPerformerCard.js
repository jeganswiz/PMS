import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack, Avatar, Grid } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';

AppPerformerCard.propTypes = {
    performerImage: PropTypes.string.isRequired,
    firstContent: PropTypes.string.isRequired,
    secondContent: PropTypes.string.isRequired,

};

export default function AppPerformerCard({ performerImage, firstContent, secondContent }) {

  return (
    <Box sx={{ p: 0 }}  mr={3}  my={6}>
      <Box sx={{ flexGrow: 1,borderRadius : '8px'  }}>
        <Stack bgcolor='#314047' height={20} alignItems='center' justifyContent='center' sx={{ borderTopLeftRadius : '8px', borderTopRightRadius : '8px' }} >
            <img height={70} style={{ marginTop:'-30px' }} width={70} src='/icons/appicon/sparklingstar.png' alt='sprkstr'/>
        </Stack>
        <Stack bgcolor='#BD2A2B' sx={{ borderBottomLeftRadius : '8px', borderBottomRightRadius : '8px' }}>
          <Grid container sx={{padding:'10px', alignItems:'center', justifyContent : 'space-around'}}>
            <Grid item md={6}>
                <Avatar
                    sx={{ bgcolor: '#ff5722' }}
                    alt={firstContent}
                    src={performerImage}
                    height={70}
                    width={70}
                />
            </Grid>
            <Grid item md={6}>
                <Stack>
                    <Typography sx={{ whiteSpace : 'nowrap', overflow : 'hidden', textOverflow : 'ellipsis', maxWidth : '100%' }} variant="spam" color='#fff'>{firstContent}</Typography>
                    <Typography sx={{ whiteSpace : 'nowrap', overflow : 'hidden', textOverflow : 'ellipsis', maxWidth : '100%' }} variant="spam" color='#fff'>{secondContent}</Typography>
                </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
