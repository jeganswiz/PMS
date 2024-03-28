import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ReactSpeedometer from 'react-d3-speedometer';
// @mui
import { Card, CardHeader, Box, TextField, Typography, Grid } from '@mui/material';
//
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BaseOptionChart } from '../../../../components/chart';
// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
    ],
  },
];

export default function PerformanceSpeedometer() {
  const [seriesData, setSeriesData] = useState(2019);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'],
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#238AEA',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    boxShadow : 'none'
  }));
  
  const StyledBox = styled(Box)(()=>({
    backgroundColor : '#238AEA',
    color : '#fff',
    padding : '3px',
    borderRadius : '5px'
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Card>
      <CardHeader
        title=""
        subheader=""
      />
        <Grid container>
            <Grid item md={6}>
                <ReactSpeedometer
                    width={800}
                    height={500}
                    needleHeightRatio={0.7}
                    value={777}
                    currentValueText="Performance Level"
                    segmentColors={['#99bddd','#7aafdd','#62a5e0','#4a9be2','#238AEA',]}
                    // segmentColors={["#a3be8c", "#ebcb8b", "#d08770", "#bf616a"]}
                    customSegmentLabels={[
                    {
                        text: 'Poor',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    {
                        text: 'Unsatisfactory',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    {
                        text: 'Satisfactory',
                        position: 'INSIDE',
                        color: '#555',
                        fontSize: '19px',
                    },
                    {
                        text: 'Very Satisfactory',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    {
                        text: 'Outstanding',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    ]}
                    ringWidth={140}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    needleColor={'#000'}
                    textColor={'#d8dee9'}
                />
            </Grid>
            <Grid item md={6} >
                <TableContainer sx={{ padding :2 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead width='100%'>
                            <TableRow>
                                <StyledTableCell align="center">Scale</StyledTableCell>
                                <StyledTableCell align="center">Adjective</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={0}>
                                <StyledTableCell align='center'><StyledBox>5</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Outstanding</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Performance represents & extraordinary level of achievement and commitment in terms of equity and time, technical skills and knowledge, ingenuity, creativity and initiative.</StyledBox></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={0}>
                                <StyledTableCell align='center'><StyledBox>4</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Very Satisfactory</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Performance exceeded expectations. All goals, objectives and targets were achieved above the established standards.</StyledBox></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={0}>
                                <StyledTableCell align='center'><StyledBox>3</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Satisfactory</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Performance met expectations in terms of quality of work, efficiency and timelines. The most critical annual goals were met.</StyledBox></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={0}>
                                <StyledTableCell align='center'><StyledBox>2</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Unsatisfactory</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Performance failed to meet expectations and or one or more of the most critical goals were not met.</StyledBox></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={0}>
                                <StyledTableCell align='center'><StyledBox>1</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Poor</StyledBox></StyledTableCell>
                                <StyledTableCell align="center"><StyledBox>Performance was consistently below expectations, and or reasonable progress towards critical goals was not made. Significant improvement is needed in one or more important areas.</StyledBox></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
      
    </Card>
  );
}
