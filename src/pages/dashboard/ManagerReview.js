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
  MenuItem,
  Avatar
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

const tableRows = [
    {
        month : 'April',
        status_icon : '/icons/appicon/verfiedpurple.png',
        status : 'verified',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'May',
        status_icon : '/icons/appicon/verfiedpurple.png',
        status : 'verified',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'June',
        status_icon : '/icons/appicon/verfiedpurple.png',
        status : 'verified',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'July',
        status_icon : '/icons/appicon/verfiedpurple.png',
        status : 'verified',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'August',
        status_icon : '/icons/appicon/verfiedpurple.png',
        status : 'verified',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'September',
        status_icon : '/icons/appicon/inprogress.png',
        status : 'inprogress',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'October',
        status_icon : '/icons/appicon/inprogress.png',
        status : 'inprogress',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'November',
        status_icon : '/icons/appicon/inprogress.png',
        status : 'inprogress',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '4.5'
    },
    {
        month : 'December',
        status_icon : '/icons/appicon/raceflag.png',
        status : 'getready',
        ownreview : 'Rate',
        lone_manager : '-',
        ltwo_manager : '-'
    },
    {
        month : 'January',
        status_icon : '/icons/appicon/block.png',
        status : 'block',
        ownreview : '4.5',
        lone_manager : '3.9',
        ltwo_manager : '-'
    },
    {
        month : 'February',
        status_icon : '/icons/appicon/block.png',
        status : 'block',
        ownreview : '4.5',
        lone_manager : '-',
        ltwo_manager : '-'
    },
    {
        month : 'March',
        status_icon : '/icons/appicon/block.png',
        status : 'block',
        ownreview : '4.5',
        lone_manager : '-',
        ltwo_manager : '-'
    },
    {
        month : 'Overall',
        status_icon : '/icons/appicon/info.png',
        status : 'info',
        ownreview : '4.5',
        lone_manager : '-',
        ltwo_manager : '-'
    },
]

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    height: '20%', // Adjust the height as needed
    borderRadius: '4px', // Add rounded corners for a nicer look
    background: '#cecece', // Set the background of the root to transparent
    top: '15px'
  },
  bar: {
    borderRadius: '4px', // Match the border radius of the root element
    background: 'linear-gradient(to right, #00ff00, #ff0000)', // Define your gradient colors for the progress value area
  },
  roundedNumber: {
    display: 'inline-block',
    borderRadius: '50%', // Create a circular shape
    width: '50px', // Set the width and height for the rounded number
    height: '50px',
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
    height: '20%', // Adjust the height as needed
    borderRadius: '4px', // Add rounded corners for a nicer look
    background: '#cecece', // Set the background of the root to transparent
    top: '15px'
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
    <Page title="Manager Reivew : Board">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Manager Reivew"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Manager Reivew', href: PATH_DASHBOARD.general.mygoals }
          ]}
        />
        <Card sx={{ borderBottomLeftRadius : 0, borderBottomRightRadius : 0, borderTopRightRadius : 0, borderTopLeftRadius : 0 }} >
         

          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', borderRadius : 0 }} >
              

              <Table size={dense ? 'small' : 'medium'} border='1'>
                <TableHead>
                  <TableRow>
                    <TableCell width="15%" align='center'>
                      <Typography color={'#000'} variant='h6'>Months</Typography>
                    </TableCell>
                    <TableCell width="5%" align='center'>
                      <Typography color={'#000'} variant='h6'>Status</Typography>
                    </TableCell>
                    <TableCell width="10%" align='center' sx={{ backgroundColor : '#C3E78947 !important' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent : 'center' }}>
                            <Avatar alt="User" src="/icons/avatar/user1.png" />
                            <Typography variant="h6" color={'#000'} style={{ marginLeft: 10 }}>
                                You
                            </Typography>
                        </div>
                    </TableCell>

                    <TableCell width="10%" align='center' sx={{ backgroundColor : '#8BC7FF8C !important' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent : 'center' }}>
                            <Avatar alt="User" src="/icons/avatar/user2.png" />
                            <Typography variant="h6" color={'#000'} style={{ marginLeft: 10 }}>
                                L1 Manager - Gowthaman
                            </Typography>
                        </div>
                        
                    </TableCell>
                    <TableCell width="10%" align='center' sx={{ backgroundColor : '#8BDCFF8C !important' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent : 'center' }}>
                            <Avatar alt="User" src="/icons/avatar/user3.png" />
                            <Typography variant="h6" color={'#000'} style={{ marginLeft: 10 }}>
                                L2 Manager - Adil 
                            </Typography>
                        </div>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => ( */}
                  {
                    tableRows.map((each, itr)=>(
                      <TableRow
                        key={each.month}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                      >
                        <TableCell align='center' sx={{ borderRight : '1px solid #000 !important', fontWeight: 'bold', color : '#000' }}>
                            {each.month}
                        </TableCell>
                        <TableCell sx={{ borderRight : '1px solid #000 !important' }}>
                            <div style={{ display:'flex', alignItems:"center", justifyContent:"center" }}>
                                <Avatar alt={each.status} src={each.status_icon} sx={{}}/>
                            </div>
                            {
                              each.status === 'verified' &&
                              <Typography variant='subtitle1' sx={{ textAlign : 'center' }}>{each.status}</Typography>
                            }
                        </TableCell>
                        <TableCell align='center' sx={{ borderRight : '1px solid #000 !important',backgroundColor : '#C3E78947 !important' }}>
                            <Typography sx={{ }} variant='subtitle1'>
                            {each.ownreview}
                            </Typography>
                        </TableCell>
                        <TableCell align='center' sx={{ borderRight : '1px solid #000 !important', backgroundColor : '#8BC7FF8C !important' }}>
                            <Typography sx={{ }} variant='subtitle1'>
                            {each.lone_manager}
                            </Typography>
                        </TableCell>
                        <TableCell align='center' sx={{ borderRight : '1px solid #000 !important', backgroundColor : '#8BDCFF8C !important'  }}>
                            <Typography sx={{ }} variant='subtitle1'>
                            {each.ltwo_manager}
                            </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                    
                    
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

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
