import sumBy from 'lodash/sumBy';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Grid,
  LinearProgress,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Select,
  MenuItem
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _invoices } from '../../_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';


// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Employee ID', align: 'left' },
  { id: 'createDate', label: 'Employee Name', align: 'left' },
  { id: 'dueDate', label: 'Due', align: 'left' },
  { id: 'price', label: 'Amount', align: 'center', width: 140 },
  { id: 'sent', label: 'Sent', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '70%', // Adjust the height as needed
    borderRadius: '4px', // Add rounded corners for a nicer look
    background: '#cecece', // Set the background of the root to transparent
  },
  bar: {
    borderRadius: '4px', // Match the border radius of the root element
    background: 'linear-gradient(to right, #00FF1A, #83D62FE0)', // Define your gradient colors for the progress value area
  },
  nonTechBar: {
    borderRadius: '4px',
    background: 'linear-gradient(to right, #3300FF, #C93BE0D6)',
  },
  roundedNumber: {
    display: 'inline-block',
    borderRadius: '50%', // Create a circular shape
    width: '60px', // Set the width and height for the rounded number
    height: '60px',
    backgroundColor: 'transparent', // Background color for the rounded number
    textAlign: 'center',
    lineHeight: '50px', // Center the text vertically
  },
  roundedFilledCircle : {
    display: 'inline-block',
    borderRadius: '50%', // Create a circular shape
    width: '25px', // Set the width and height for the rounded number
    height: '25px',
    color: '#fff',
    textAlign: 'center',
    // lineHeight: '50px', // Center the text vertically
  },
  smallProgressbarRoot: {
    width: '150px',
    height: '100%', // Adjust the height as needed
    borderRadius: '4px', // Add rounded corners for a nicer look
    background: '#cecece', // Set the background of the root to transparent
  },
  labelWithBarflex: {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : '10px',
  },
  gridHeldedProgress: {
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center'
  }
}));

export default function InvoiceList() {
  const theme = useTheme();
  const classes = useStyles();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState(_invoices);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('technicalskills');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  const TABS = [
    { value: 'technicalskills', label: 'Technical Skills', color: 'info', count: tableData.length },
    { value: 'nontechnicalskills', label: 'Non-Technical Skills', color: 'warning', count: getLengthByStatus('paid') }
  ];

  return (
    <Page title="My Skills : Board">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="My Skills Board"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'My Skills', href: PATH_DASHBOARD.general.mygoals }
          ]}
        />
        <Card sx={{ borderBottomLeftRadius : 0, borderBottomRightRadius : 0 }} className={classes.myGoalsTable}>
          <Grid container>
            <Grid item md={6}>
              <Tabs
                allowScrollButtonsMobile
                variant="scrollable"
                scrollButtons="auto"
                value={filterStatus}
                onChange={onFilterStatus}
                sx={{ px: 2 }}
              >
                {
                  TABS.map((tab) => (
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
                  ))
                }
              </Tabs>
            </Grid>
            <Grid item md={3}>
              <></>
            </Grid>
            <Grid item md={3}>
              {/* <Grid container>
                <Grid item md={3}>
                  <Typography sx={{ top : "10px" }} variant="span">High Potential</Typography>
                </Grid>
                <Grid md={1}><></></Grid>
                <Grid item md={8}>
                  <LinearProgress
                    value={70}
                    variant="determinate"
                    classes={{
                      root: classes.root,
                      bar: classes.bar,
                    }}
                  />
                </Grid>
              </Grid> */}
              <Stack sx={{ display : 'flex', flexDirection : 'row', gap: '23px', marginTop : '11px', height : '30px' }} >
                <Stack>
                  <Typography sx={{ top : "10px" }} variant="span">High Potential</Typography>
                </Stack>
                <Stack sx={{ width : '60%' }}>
                  {/* <Stack> */}
                    <LinearProgress
                      value={70}
                      variant="determinate"
                      classes={{
                        root: classes.root,
                        bar: classes.bar,
                      }}
                    />
                  {/* </Stack> */}
                  
                  <Stack sx={{ display : 'flex', flexDirection : 'row', justifyContent : 'space-between' }}>
                    <Stack>
                      <Typography sx={{ fontSize : '10px' }}>Low</Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontSize : '10px' }}>Medium</Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontSize : '10px' }}>High</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              
            </Grid>
          </Grid>
          

          <Divider />

          <Grid container> 
            <Grid item md={4}>
              <TableContainer sx={{  position: 'relative' }}>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Employee ID</TableCell>
                      <TableCell align='center'>Employee Name</TableCell>
                      <TableCell align='center' sx={{ borderRight : '1px solid #000' }}>Designation</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow
                      key={'CIPL1434'}
                      sx={{ height : '92px' }}
                    >
                      <TableCell align='center' component="th" scope="row">
                        {'CIPL1434'}
                      </TableCell>
                      <TableCell align='center'>{'Jeganathan'}</TableCell>
                      <TableCell align='center' sx={{ borderRight : '1px solid #000 !important' }}>{'20'}</TableCell>
                      
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={8}>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                  <Table size={dense ? 'small' : 'medium'}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>React JS</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Express JS</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>GraphQL</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>AWS</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>MongoDB</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>MySQL</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>DockerDocker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>DockerDockerDocker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                        <TableCell sx={{ whiteSpace : 'nowrap', minWidth: '110px', maxWidth : '110px',  overflow
                        : 'hidden', textOverflow : 'ellipsis' }} align='center'>Docker</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={'CIPL1434'}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align='center'>
                          <Typography sx={{ color : '#4E22F8', border : '5px solid #4E22F8' }} variant='h6' className={classes.roundedNumber}>
                            {'55'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#FC2A2D', border : '5px solid #FC2A2D' }} variant='h6' className={classes.roundedNumber}>
                            {'55'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#FC2A2D', border : '5px solid #FC2A2D' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#38FB64', border : '5px solid #38FB64' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>

                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography sx={{ color : '#5ACFEE', border : '5px solid #5ACFEE' }} variant='h6' className={classes.roundedNumber}>
                            {'4'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>    
            </Grid>
          </Grid>
          
          
          
          <Stack sx={{ minHeight : '100%', display : 'flex', flexDirection : 'column' }}>
            <Box sx={{ position: 'relative', border : '1px solid #000', marginTop : 'auto' }}>
              <Grid container>
                <Grid item md={1} sx={{ borderRight : '1px solid #000', padding : '10px', fontWeight : 'bold' }}>
                  <Typography variant='subtitle1' sx={{ background : '#D71720' }} className={classes.roundedFilledCircle}>
                    1
                  </Typography> Low
                </Grid>
                <Grid item md={1} sx={{ borderRight : '1px solid #000', padding : '10px', fontWeight : 'bold' }}>
                  <Typography variant='subtitle1' sx={{ background : '#14A4DA' }} className={classes.roundedFilledCircle}>
                    2
                  </Typography> Medium
                </Grid>
                <Grid item md={1} sx={{ borderRight : '1px solid #000', padding : '10px', fontWeight : 'bold' }}>
                  <Typography variant='subtitle1' sx={{ background : '#DA472D' }} className={classes.roundedFilledCircle}>
                    3
                  </Typography> Good
                </Grid>
                <Grid item md={1} sx={{ borderRight : '1px solid #000', padding : '10px', fontWeight : 'bold' }}>
                  <Typography variant='subtitle1' sx={{ background : '#00C462' }} className={classes.roundedFilledCircle}>
                    4
                  </Typography> Very Good
                </Grid>

                <Grid item md={2} className={classes.gridHeldedProgress}>
                 
                  <Stack ml={2} className={classes.labelWithBarflex}>
                    <Stack>
                      <Typography sx={{  fontSize : '15px', fontWeight : 'bold' }} variant="span">Technical</Typography>
                    </Stack>
                    <Stack height={7}> 
                      <LinearProgress
                        value={70}
                        sx={{ width : '150px' }}
                        variant="determinate"
                        classes={{
                          root: classes.smallProgressbarRoot,
                          bar: classes.bar,
                        }}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item md={3} className={classes.gridHeldedProgress}>
                  {/* <Grid container>
                    <Grid item md={3}>
                      <Typography sx={{ top : "10px", fontSize : '15px', fontWeight : 'bold' }} variant="span">Non-Technical</Typography>
                    </Grid>
                    <Grid md={1}><></></Grid>
                    <Grid item md={8}>
                      <LinearProgress
                        value={70}
                        sx={{ width : '150px' }}
                        variant="determinate"
                        classes={{
                          root: classes.smallProgressbarRoot,
                          bar: classes.bar,
                        }}
                      />
                    </Grid>
                  </Grid> */}

                  <Stack ml={2} className={classes.labelWithBarflex}>
                    <Stack>
                      <Typography sx={{ fontSize : '15px', fontWeight : 'bold' }} variant="span">Non-Technical</Typography>
                    </Stack>
                    <Stack height={7}>
                      <LinearProgress
                        value={70}
                        sx={{ width : '150px' }}
                        variant="determinate"
                        classes={{
                          root: classes.smallProgressbarRoot,
                          bar: classes.nonTechBar,
                        }}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item md={3} >
                  <Stack alignItems="flex-end" >
                    <Select 
                      size='small'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={10}  
                      sx={{ marginTop: '2.5px' }}         
                    >
                      <MenuItem value={10}>Team View</MenuItem>
                      <MenuItem value={20}>My View</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                {/* <Grid item md={1} sx={{ borderRight : '1px solid #000' }}>
                  ssss
                </Grid>
                <Grid item md={1} sx={{ borderRight : '1px solid #000' }}>
                  dddd
                </Grid>
                <Grid item md={1} sx={{ borderRight : '1px solid #000' }}>
                  fffff
                </Grid> */}

              </Grid>
            </Box>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        item.createDate.getTime() >= filterStartDate.getTime() && item.createDate.getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
