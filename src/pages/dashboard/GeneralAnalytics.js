import { useState } from 'react';
// @mui
import { Grid, Container, Typography, Card, Tabs, Stack, Divider, Tab, Box, FormControl, Select, MenuItem } from '@mui/material';
// hooks
import PropTypes from 'prop-types';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';
import { EcommerceYearlySales, PerformanceSpeedometer } from '../../sections/@dashboard/general/e-commerce';
// ----------------------------------------------------------------------
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const [value, setValue] = useState('targetvsachieved');
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleYearChange = (event) => {
    setSelectedValue(event.target.value);
  }
  const TABS = [
    { value: 'targetvsachieved', label: 'Target vs Achieved', color: 'info', count: null },
    { value: 'ratingperformance', label: 'Rating Performance', color: 'warning', count: null },
    { value: 'annualperformance', label: 'Annual Performance', color: 'error', count: null },
    { value: 'skillsanalytics', label: 'Skills Analytics', color: 'success', count: null }
  ];
  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div>
                  </Stack>
                }
              />
            ))}
          </Tabs>
          <Divider />
          
          <CustomTabPanel value={value} index='targetvsachieved'>
            <Grid item xs={12} md={12} lg={12} sx={{ display : 'flex', justifyContent : 'space-between', alignItems : 'center', mb: 2 }}>
              <Stack>
                <Typography variant='h4'>
                  Target VS Achieved
                </Typography>
              </Stack>
              <Stack>
                <FormControl>
                  <Select
                    value={selectedValue}
                    onChange={handleYearChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select' }}
                  >
                    <MenuItem value="" disabled>
                      Year
                    </MenuItem>
                    <MenuItem value="2020-2021">FY 2020-21</MenuItem>
                    <MenuItem value="2021-2022">FY 2021-22</MenuItem>
                    <MenuItem value="2022-2023">FY 2022-23</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <AnalyticsWebsiteVisits />
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index='ratingperformance'>
            <Grid item xs={12} md={12} lg={12} sx={{ display : 'flex', justifyContent : 'space-between', alignItems : 'center', mb: 2 }}>
              <Stack>
                <Typography variant='h4'>
                  Performance Rating
                </Typography>
                <Typography variant='subtitle1'>
                  5 Point Rating Scale
                </Typography>
              </Stack>
              <Stack>
                <FormControl>
                  <Select
                    value={selectedValue}
                    onChange={handleYearChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select' }}
                  >
                    <MenuItem value="" disabled>
                      Year
                    </MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>    
            <PerformanceSpeedometer />
          </CustomTabPanel>
          <CustomTabPanel value={value} index='annualperformance'>
            <Grid item xs={12} md={12} lg={12} sx={{ display : 'flex', justifyContent : 'space-between', alignItems : 'center', mb: 2 }}>
              <Stack>
                <Typography variant='h4'>
                  Annual Performance
                </Typography>
              </Stack>
              <Stack>
                <FormControl>
                  <Select
                    value={selectedValue}
                    onChange={handleYearChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select' }}
                  >
                    <MenuItem value="" disabled>
                      Year View
                    </MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <EcommerceYearlySales />
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index='skillsanalytics'>
            <Grid item xs={12} md={12} lg={12} sx={{ display : 'flex', justifyContent : 'space-between', alignItems : 'center', mb: 2 }}>
              <Stack>
                <Typography variant='h4'>
                  Skills Radar
                </Typography>
              </Stack>
              <Stack>
                <></>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <AnalyticsCurrentSubject />
            </Grid>
          </CustomTabPanel>
          
        </Card>
        
      </Container>
    </Page>
  );
}
