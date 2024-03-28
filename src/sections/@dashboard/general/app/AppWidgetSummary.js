import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.string.isRequired,
  insightText: PropTypes.string.isRequired,
  bottomIcon: PropTypes.string.isRequired,
  insightCount:PropTypes.number.isRequired,
};

export default function AppWidgetSummary({ title, titleIcon, insightText, bottomIcon, insightCount }) {

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="h5">{title}</Typography>
            </div>

            <div>
              <img src={titleIcon} alt={title}/>
            </div>
          </Box>
        </Stack>
        
        <Stack sx={{ justifyContent : 'center', alignItems : 'center',mt:2,mb:2 }}>
          <Box>
            <Typography variant='h6' sx={{ width:'10%' }}>{insightCount}<Typography variant='span' sx={{ml:1}}>{insightText}</Typography></Typography>
          </Box>
        </Stack>

        <Stack >
          <Box display="flex" justifyContent="space-between">
            <>
             <div><></></div> 
            </>
            <div>
              <img src={bottomIcon} alt="documentsearch.png"/>
            </div>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
