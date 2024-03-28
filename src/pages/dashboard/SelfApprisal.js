import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card as MuiCard,
  Stack,
  Container,
  Grid,
  Typography,
  Chip,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import Button from 'src/theme/overrides/Button';
import { GoalDetail, GoalReview } from '../../sections/selfapprisal';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TopAlert from '../../components/TopAlert';

export default function SelfApprisal() {

  const Card = styled(MuiCard)(
    () => `
      border-radius : 7px;
    `,  
  );

  const { themeStretch } = useSettings();

  const currentYearScore = [
    { month : 'Mar', score : 4.0 },
    { month : 'Apr', score : 4.1 },
    { month : 'May', score : 4.5 },
    { month : 'Jun', score : 4.9 },
    { month : 'Jul', score : 3.9 },
    { month : 'Aug', score : 3.5 },
    { month : 'Sep', score : 4.5 },
    { month : 'Oct', score : 2.6 },
    { month : 'Nov', score : 4.7 },
    { month : 'Dec', score : 0 },
    { month : 'Jan'},
    { month : 'Feb'},
  ];

  const GoalsData = [
    {
      goalType : 'low',
      goalTitle : 'Micro-Service Architecture Setup',
      goalDescription : 'Pidgeotto claims a large area as its own territory. This Pokémon flies around, patrolling its living space. If its territory is violated, it shows no mercy in thoroughly punishing the foe with its sharp claws.Ponyta is very weak at birth. It can barely stand up. This Pokémon becomes stronger by stumbling and falling to keep up with its parent.It’s said that gas emanating from a graveyard was possessed by the grievances of the deceased and thus became a Pokémon.',
      goalWeightage : 26.2,
      goalProgress : 20.3,
    },
    {
      goalType : 'high',
      goalTitle : 'Colan PMS UI works',
      goalDescription : 'I find inspiration in ad copy that takes little space to reflect a strong message. Sure, you’ll need to write much more than a couple of sentences for your content marketing, but simplicity has merit. How well you write always sets the stage for what’s to come.',
      goalWeightage : 26.2,
      goalProgress : 60.3,
    },
    {
      goalType : 'Medium',
      goalTitle : 'Kodly app direct client works',
      goalDescription : 'For example, maximize the 35 characters available in a Google ad headline. On social media, though, you might improve engagement by stopping well short of the maximum character limits.It gets tougher with website pages, articles, and blog posts. I understand that short pieces (let’s say anything under 500 words) are easier to consume for online readers. But longer content can draw in people as well. Visuals in the core content and within the site architecture can support your text.',
      goalWeightage : 26.2,
      goalProgress : 80.3,
    },
    {
      goalType : 'Medium',
      goalTitle : 'Kodly app direct client works',
      goalDescription : 'For example, maximize the 35 characters available in a Google ad headline. On social media, though, you might improve engagement by stopping well short of the maximum character limits.It gets tougher with website pages, articles, and blog posts. I understand that short pieces (let’s say anything under 500 words) are easier to consume for online readers. But longer content can draw in people as well. Visuals in the core content and within the site architecture can support your text.',
      goalWeightage : 26.2,
      goalProgress : 80.3,
    },
    {
      goalType : 'Medium',
      goalTitle : 'Kodly app direct client works',
      goalDescription : 'For example, maximize the 35 characters available in a Google ad headline. On social media, though, you might improve engagement by stopping well short of the maximum character limits.It gets tougher with website pages, articles, and blog posts. I understand that short pieces (let’s say anything under 500 words) are easier to consume for online readers. But longer content can draw in people as well. Visuals in the core content and within the site architecture can support your text.',
      goalWeightage : 26.2,
      goalProgress : 80.3,
    },
    {
      goalType : 'Medium',
      goalTitle : 'Kodly app direct client works',
      goalDescription : 'For example, maximize the 35 characters available in a Google ad headline. On social media, though, you might improve engagement by stopping well short of the maximum character limits.It gets tougher with website pages, articles, and blog posts. I understand that short pieces (let’s say anything under 500 words) are easier to consume for online readers. But longer content can draw in people as well. Visuals in the core content and within the site architecture can support your text.',
      goalWeightage : 26.2,
      goalProgress : 80.3,
    },
    {
      goalType : 'Medium',
      goalTitle : 'Kodly app direct client works',
      goalDescription : 'For example, maximize the 35 characters available in a Google ad headline. On social media, though, you might improve engagement by stopping well short of the maximum character limits.It gets tougher with website pages, articles, and blog posts. I understand that short pieces (let’s say anything under 500 words) are easier to consume for online readers. But longer content can draw in people as well. Visuals in the core content and within the site architecture can support your text.',
      goalWeightage : 26.2,
      goalProgress : 80.3,
    }
    
  ]

  return (
    <Page title="Self apprisal: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <Stack sx={{alignItems : 'center', justifyContent : 'center' }}>
          <Alert sx={{ padding : '0px 16px',width:'auto',alignItems : 'center', justifyContent : 'center' }} severity="warning">
              <Typography>The October 2023 self-assessments are closed, Please raise the request to your manager for approval <Link to={"/dashboard/app"} style={{ cursor : 'pointer' }}>here</Link>.</Typography>
          </Alert>
        </Stack> */}
        <TopAlert bgcolor="#FF9900" content="The October 2023 self-assessments are closed, Please raise the request to your manager for approval" />
        
        <HeaderBreadcrumbs
          heading="Self Apprisal"
          links={[
            { name: 'Self Apprisal', href: PATH_DASHBOARD.general.selfapprisal },
            { name: 'Continous Review', href: PATH_DASHBOARD.root },
          ]}
        />
        <Grid container spacing={4}>
          <Grid item xs={2} sm={2} md={2} lg={2} >
            <Stack >
                <Card sx={{ padding : '20px 8px', backgroundColor : '#F7F7F8', boxShadow : '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius : '8px'  }}>
                  <Grid container spacing={1}>
                    <Grid item md={8}>
                      <Typography variant='h6'>Continous Review</Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Chip label="4" size="small" />
                    </Grid>
                    <Grid item md={2}>
                      <img src="/icons/continousreview.png" alt='continuos' style={{ height : '30px', width : '30px' }}/>
                    </Grid>
                  </Grid>
                </Card>
            </Stack>
            <Stack  sx={{ mt:2 }}>
              <Card sx={{ padding : '20px 8px', boxShadow : '0px 7px 10px rgba(0, 0, 0, 0.1)', textAlign : 'center'  }}>
                <Typography variant='h6'>Overall score </Typography>
                <Typography variant='h6'>4.5 </Typography>
              </Card>
            </Stack>
            <Stack  sx={{ mt:2 }}>
              <Card sx={{ padding : '14px 4px', boxShadow : '0px 0px 0px rgba(0, 0, 0, 0)', textAlign : 'center', backgroundColor : '#f5f5f5'  }}>
                <Grid container>
                  <Grid item xs={6} justifyContent='flex-start'>
                    <Typography sx={{ fontWeight:'bold' }}>Month</Typography>
                  </Grid>
                  <Grid item xs={6} justifyContent='flex-end'>
                    <Typography sx={{ fontWeight:'bold' }}>Score</Typography>
                  </Grid>
                </Grid>
              </Card>
              {
                currentYearScore && currentYearScore.length > 0 &&
                currentYearScore.map((each,itr)=>(
                  <Card key={itr} sx={{ padding : '14px 4px', boxShadow : '0px 7px 10px rgba(0, 0, 0, 0.1)', textAlign : 'center', mb : 2  }}>
                    <Grid container>
                      <Grid item xs={6} justifyContent='flex-start'>
                        <Typography>{each.month}</Typography>
                      </Grid>
                      <Grid item xs={6} justifyContent='flex-end'>
                        <Typography>
                          {/* { (each.score === 0) ? 'Rate' : each.score ?? '-' } */}
                          {/* {  
                            each.score === undefined ? 
                              '-' 
                            : (each.score === 0) ? 
                              <RouterLink>Rate</RouterLink> 
                            : 
                              each.score 
                          } */}
                          {
                            (()=>{
                              if(each.score === undefined) { return '-' };
                              if(each.score === 0) { return <RouterLink to='/'>Rate</RouterLink> };
                              return each.score;
                            })()
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                ))
              }
            </Stack>
          </Grid>

          <Grid item xs={10} sm={10} md={10} lg={10}>
            <Stack>
              <Grid container>
                <Grid item md={6} sm={6} lg={6} sx={{ maxWidth : '49.6% !important' }}>
                  <Stack sx={{ padding: '12px', display : 'flex', flexDirection : 'row', alignItems : 'center' }} borderBottom={2} borderColor={'#c1c1c1'} >
                    <Typography sx={{ fontWeight:'bold',height : '56px' }}>
                      Goal 01<span style={{ fontSize : '12px' }}>st</span> Dec 2023 - 31<span style={{ fontSize : '12px' }}>st</span> Dec 2023
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item md={6} sm={6} lg={6} sx={{ background: 'rgba(124, 190, 211, 0.21)' }}>
                  <Stack sx={{ padding: '12px' }} borderBottom={2} borderColor={'#c1c1c1'}>
                    {/* <Grid container sx={{ paddingLeft:'20px' }}>
                      <Grid item>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg"
                          sx={{ width: 56, height: 56, bottom: '20px' }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography sx={{ fontWeight:'bold', marginLeft : '18px' }}>
                          Mr. John Doe Nicholas
                        </Typography>
                      </Grid>
                    </Grid> */}
                    <Stack sx={{ display : 'flex', flexDirection : 'row', alignItems : 'center' }}>
                      <Stack>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg"
                          sx={{ width: 56, height: 56}}
                        />
                      </Stack>
                      <Stack>
                        <Typography sx={{ fontWeight:'bold', marginLeft : '18px' }}>
                          Mr. John Doe Nicholas
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ maxHeight: '835px', overflowY: 'auto' }}>
              {
                GoalsData.map((goal,itr)=>(
                <Grid container key={itr}>
                  <Grid item md={6} sm={6} lg={6}>
                    <GoalDetail key={itr} goalType={goal.goalType} goalTitle={goal.goalTitle} goalDescription={goal.goalDescription} goalWeightage={goal.goalWeightage} goalProgress={goal.goalProgress} />
                  </Grid>
                  <Grid item md={6} sm={6} lg={6}  sx={{ background: 'rgba(124, 190, 211, 0.21)' }} >
                    <GoalReview key={itr} />
                  </Grid>
                </Grid>
                ))
              }
            </Stack>
            <Stack sx={{ marginTop : '20px' }}>
              <Grid container>
                
                <Grid item md={4}>
                  <></>
                </Grid>
                <Grid item md={2} >
                  <Typography sx={{ float : 'right', paddingRight : '20px' }} variant='h6'>Total Average</Typography>
                </Grid> 
                <Grid item md={2}>
                  <TextField size='small' sx={{paddingLeft : '14px'}} InputProps={{
                      style: {
                          width: '45%',
                          borderRadius: "0",
                          borderColor: "#000",
                          '&:focus':{
                          borderColor: 'none'
                          },
                          marginTop : '-9px',
                          backgroundColor : '#fff',
                      },
                      readOnly: true
                      }} 
                  />
                </Grid>
                <Grid item md={1}>
                  <></>
                </Grid>
                <Grid item md={1.5}>
                  <Button sx={{ border : '2px solid #5E9ED9', width:'90%' }}>Save as Draft</Button>
                </Grid>
                <Grid item md={1.5}>
                  <Button sx={{ border : '2px solid #5E9ED9', width:'90%' }}>Submit </Button>
                </Grid>

              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}