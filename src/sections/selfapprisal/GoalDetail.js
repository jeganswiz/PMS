import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import { Typography, Grid, Stack  } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { HistoryToggleOff } from "@mui/icons-material";

GoalDetail.propTypes = {
    goalType : PropTypes.string,
    goalTitle : PropTypes.string,
    goalDescription : PropTypes.string,
    goalWeightage : PropTypes.number,
    goalProgress : PropTypes.number
};
export default function GoalDetail({ goalType, goalTitle, goalDescription, goalWeightage, goalProgress }) {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#fff',
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#44bf67',
        },
    }));
    return (
        <Stack sx={{ padding: '12px', maxHeight: '275px' , minHeight: '275px' }} borderBottom={2} borderColor={'#c1c1c1'}>
            <Grid container spacing={1}>
            <Grid item md={1}>
                <Typography
                    variant="p"
                    sx={{
                        borderTopRightRadius : '10px',
                        borderBottomRightRadius : '10px',
                        backgroundColor : (goalType === 'low' && '#C4F7BC') || (goalType === 'high' && '#F8C4BA') || '#F8C4BA',
                        textTransform : 'capitalize',
                        fontSize : '12px',
                        padding : '1px 5px',
                        color : (goalType === 'low' && '#64b546') || (goalType === 'high' && '#A10B0C') || '#BA983C',
                    }}
                >
                {goalType}
                </Typography>
            </Grid>
            <Grid item md={1}>
                <HistoryToggleOff sx={{ color : 'red' }} />
            </Grid>
            <Grid item md={10}>
                <Typography variant='h6'>
                    { goalTitle }
                </Typography>
            </Grid>
            </Grid>
            <Grid container spacing={0}>
            <Grid item md={1}>
                <></>
            </Grid>
            <Grid item md={11} sx={{ padding : '13px',maxHeight: '170px', minHeight: '170px', overflow: 'hidden' }}>
                <Typography 
                variant='p'
                
                >
                { goalDescription }
                </Typography>
            </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ mt: 3 }}>
            <Grid item md={1}>
                <></>
            </Grid>
            <Grid item md={2}>
                <Typography variant='p' sx={{ color : '#4798E3', cursor : 'pointer' }}>
                Comments
                </Typography>
            </Grid>
            <Grid item md={3}>
                <Typography variant='span' sx={{ marginRight:"11px" }}>
                Weightages
                </Typography>
                <Typography variant='span'>
                {goalWeightage}%
                </Typography>
            </Grid>
            <Grid item md={1.3}>
                <Typography variant='span' sx={{ marginRight:"11px" }}>
                Progress
                </Typography>
            </Grid>
            <Grid item md={3.7} sx={{ mt:'7px' }}>
                <BorderLinearProgress variant="determinate" value={goalProgress} />
            </Grid>
            </Grid>
        </Stack>
    )
}

