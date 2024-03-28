import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Typography } from '@mui/material';
// hooks
import Slider from 'react-slick';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import TopAlert from '../../components/TopAlert';

// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
  AppPerformerCard
} from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const carouselRef = useRef(null);
  const slicksliderArr= [
    {
      name:'Jegan A',
      designation: 'MERN',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Priya D',
      designation: 'Dev',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Prithivi',
      designation: 'Node',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Muthu Pandi',
      designation: 'FullStack',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Gowthaman',
      designation: 'Manager',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Ramesh Kanna',
      designation: 'React Dev',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Sheeba',
      designation: 'Designer',
      image : 'https://i.pravatar.cc/300'
    },
    {
      name:'Sakthi',
      designation: 'Dot Net',
      image : 'https://i.pravatar.cc/300'
    },
    
    {
      name:'Pondurai N',
      designation: 'PHP developer',
      image : 'https://i.pravatar.cc/300'
    },
  ];
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 9,
    slidesToScroll: 1,
    infinite: false,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };
  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <TopAlert bgcolor="#0094FF" content="The October 2023 self-assessment are closing in 2 days. Please completed your assessment without any delay" />
        <Stack sx={{mb:2}}>
          <Typography variant='h4'>My Reviews</Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Completed"
              titleIcon='/icons/appicon/threebluestar.png'
              insightCount={8}
              insightText="Reviews"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="On-progress"
              titleIcon='/icons/appicon/threebluestar.png'
              insightCount={1}
              insightText="Reviews"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Manager - Completed"
              titleIcon='/icons/appicon/threebluestar.png'
              insightCount={5}
              insightText="Reviews"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Manager - On Progress"
              titleIcon='/icons/appicon/threebluestar.png'
              insightCount={3}
              insightText="Reviews"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>
        </Grid>

        <Stack sx={{mb:4,mt:4}}>
          <Typography variant='h4'>Goals View</Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Total Goals"
              titleIcon='/icons/appicon/pickflag.png'
              insightCount={8}
              insightText="Goals"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Goals - Completed"
              titleIcon='/icons/appicon/pickflag.png'
              insightCount={1}
              insightText="Goals"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Goals - On Progress"
              titleIcon='/icons/appicon/pickflag.png'
              insightCount={5}
              insightText="Goals"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <></>
          </Grid>
        </Grid>

        <Stack sx={{mb:4,mt:4}}>
          <Typography variant='h4'>My Request</Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Total Request"
              titleIcon='/icons/appicon/userreq.png'
              insightCount={8}
              insightText="Requests"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Total Approved"
              titleIcon='/icons/appicon/userreq.png'
              insightCount={1}
              insightText="Requests"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Total Declined"
              titleIcon='/icons/appicon/userreq.png'
              insightCount={5}
              insightText="Requests"
              bottomIcon='/icons/appicon/documentsearch.png'
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <></>
          </Grid>
        </Grid>

        <Stack sx={{mb:0,mt:4}}>
          <Typography variant='h4'>Performer This Month</Typography>
        </Stack>
        
        <Slider ref={carouselRef} {...settings} >
          {slicksliderArr.map((item,itr) => (
            <AppPerformerCard
              performerImage={item.image}
              firstContent={item.name}
              secondContent={item.designation}
            />
          ))}
        </Slider>
        {/* <Grid container spacing={3}>
          <Grid item xs={3} md={1}>
            
          </Grid>
          
        </Grid> */}
      </Container>
    </Page>
  );
}
