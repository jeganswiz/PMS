import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
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

export default function EcommerceYearlySales() {
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

  return (
    <Card>
      <CardHeader
        title=""
        subheader=""
        // action={
        //   // <TextField
        //   //   select
        //   //   fullWidth
        //   //   value={seriesData}
        //   //   SelectProps={{ native: true }}
        //   //   onChange={handleChangeSeriesData}
        //   //   sx={{
        //   //     '& fieldset': { border: '0 !important' },
        //   //     '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
        //   //     '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
        //   //     '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
        //   //   }}
        //   // >
        //   //   {CHART_DATA.map((option) => (
        //   //     <option key={option.year} value={option.year}>
        //   //       {option.year}
        //   //     </option>
        //   //   ))}
        //   // </TextField>
        // }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="area" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
