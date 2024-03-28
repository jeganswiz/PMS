import { useEffect, useState } from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Grid,Button, Stack } from '@mui/material';
//
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'React', data: [80, 50, 30, 40, 100, 20] },
  { name: 'MySQL', data: [20, 30, 40, 80, 20, 80] },
  { name: 'Node', data: [44, 76, 78, 13, 43, 10] },
];

const technologyButton = [
  {
    technology : 'ReactJS',
    boxShadow : false,
    bgColor : '#FA878799'
  },
  {
    technology : 'Angular',
    boxShadow : false,
    bgColor : '#FAD38799'
  },
  {
    technology : 'NodeJS',
    boxShadow : false,
    bgColor : '#66BCFDA6'
  },
  {
    technology : 'ExpressJS',
    boxShadow : false,
    bgColor : '#52ECB8'
  },
  {
    technology : 'GraphQL',
    boxShadow : false,
    bgColor : '#89FA8799'
  },
  {
    technology : 'MongoDB',
    boxShadow : false,
    bgColor : '#87FADE99'
  },
  {
    technology : 'MySQL',
    boxShadow : false,
    bgColor : '#C466FDA6'
  },
  {
    technology : 'Prisma',
    boxShadow : false,
    bgColor : '#EC52B8'
  },
  {
    technology : 'Apache Kafka',
    boxShadow : false,
    bgColor : '#A587FA99'
  },
  {
    technology : 'AWS - S3',
    boxShadow : false,
    bgColor : '#F8FA8799'
  },
  {
    technology : 'Docker',
    boxShadow : false,
    bgColor : '#FD6666A6'
  },
  {
    technology : 'Kubernetes',
    boxShadow : false,
    bgColor : '#EC9352A6'
  },
  {
    technology : 'Communication',
    boxShadow : false,
    bgColor : '#90FA87F0'
  },
  {
    technology : 'People Skills',
    boxShadow : false,
    bgColor : '#878CFAD9'
  },
  {
    technology : 'Deno JS',
    boxShadow : true,
    bgColor : '#9F969CEB'
  },
  
];



export default function AnalyticsCurrentSubject() {
  const theme = useTheme();
  const [stackButtons,setStackButtons] = useState([]);
  useEffect(()=>{
    setStackButtons(technologyButton)
  },[])
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
          ],
        },
      },
    },
  });
  const handleShadowBtn = (key) => {
    let updatedShodowValFlag = true;
    if(updatedShodowValFlag === stackButtons[key].boxShadow) {
      updatedShodowValFlag = false;
    }
    stackButtons[key].boxShadow = updatedShodowValFlag;
    // console.log('heeyyy');
    console.log(stackButtons[key].boxShadow);
    // console.log('stackButtons');
    // console.log(stackButtons);
    setStackButtons([...stackButtons]);
  }
  return (
    <Card>
      <Grid container>
        <Grid item md={6}>
          <ChartWrapperStyle dir="ltr">
            <ReactApexChart type="radar" series={CHART_DATA} options={chartOptions} height={340} />
          </ChartWrapperStyle>
        </Grid>
        <Grid item md={6} sx={{ paddingTop : 10 }}>
          <Grid container >
            {
              stackButtons.map((each, itr)=>(
                <Grid key={itr} item md={3} padding={1}>
                  <Button sx={[{ width : '85%', color : '#000', backgroundColor : each.bgColor }, each.boxShadow === true && { boxShadow : '0px 4px 4px 0px rgba(0, 0, 0, 0.26) inset' }]} onClick={(e)=>{ e.stopPropagation(); handleShadowBtn(itr) }}>{each.technology}</Button>
                </Grid>
              ))
            }
            
          </Grid>
          <Grid container mt={3}>
            <Grid item md={9}><></></Grid>
            <Grid item md={3}>
              <Button sx={{ border : '2px solid #5E9ED9', width : '79%' }}>Submit </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </Card>
  );
}
