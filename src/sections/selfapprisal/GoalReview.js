// import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import { Typography, Grid, Stack, TextareaAutosize, TextField, Rating, Checkbox } from "@mui/material";
import { useState } from "react";

// GoalReview.propTypes = {
//     goalType : PropTypes.string,
//     goalTitle : PropTypes.string,
//     goalDescription : PropTypes.string,
//     goalWeightage : PropTypes.number,
//     goalProgress : PropTypes.number
// };
export default function GoalReview() {
    
    const [ratingValue, setRatingValue] = useState('');
    const [ratingInputValue, setRatingInputValue] = useState('');

    const [ratingError, setRatingError] = useState(false);

    const BaseTextareaAutosize = styled(TextareaAutosize)(
        () => `
            width: 100%;
            max-width: 100%;
            max-height: 120px;
            font-family: IBM Plex Sans, sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 8px 12px;
            border-radius: 1px;
            
            // firefox
            &:focus-visible {
            outline: 0;
            }
      `,
    );

    const handleInputChange = (event) => {
        const {value} = event.target;
    
        // Regular expression to match float values
        const floatRegex = /^\d*\.?\d{0,1}$/;
        // const floatRegex = /^\d+(\.\d*)?$/;
        

    
        if (floatRegex.test(value)) {
            let restrictValue;
            if(parseFloat(value) === 0) {
                // restrictValue = 1;
                setRatingError(true);
                setRatingInputValue(value)
                setRatingValue('');
            } else if (parseFloat(value) > 5) {
                // restrictValue = 5;
                setRatingError(true);
                setRatingInputValue(value);
                setRatingValue('');
            } else {
                restrictValue = value;
                setRatingValue(restrictValue);
                setRatingInputValue(value)
                setRatingError(false);
            }
            
        } else {
            console.log('length');
            console.log(value.length);
            if(value.length !== 0) {
                setRatingValue((prevRatingValue) => prevRatingValue);
            } else {
                setRatingValue('');
            }
            setRatingError(true);
        }
    };
    return (
        <Stack sx={{ padding: '12px', maxHeight: '275px' , minHeight: '275px' }} borderBottom={2} borderColor={'#c1c1c1'}>
            <Stack sx={{ mb: '12px' }} >
            <Grid container sx={{ paddingLeft:'20px' }}>
                <Grid item md={1}>
                <TextField 
                    size='small'
                    InputProps={{
                        style: {
                            borderRadius: "0",
                            borderColor: "#000",
                            '&:focus':{
                            borderColor: 'black'
                            },
                            backgroundColor: '#fff'
                        }
                    }} 
                    value={ratingInputValue}
                    onChange={handleInputChange}
                    error={ratingError}
                    id="outlined-basic"  variant="outlined" 
                />
                </Grid>
                <Grid item md={10}>
                    <Rating 
                        name="half-rating" 
                        sx={{mt:1,marginLeft:'30px'}} 
                        defaultValue={0} 
                        value={ratingValue}
                        precision={0.1} 
                        readOnly
                    />
                </Grid>
            </Grid>
            </Stack>

            <Stack sx={{ mb: '12px' }} >
            <Grid container sx={{ paddingLeft:'20px' }}>
                <Grid item md={1} sx={{ paddingLeft:'10px' }}>
                <Checkbox />
                </Grid>
                <Grid item md={10} sx={{paddingTop:'8px'}}>
                <Typography sx={{mt:2}} variant='p' >N/A</Typography>
                </Grid>
            </Grid>
            </Stack>

            <Stack sx={{ mb: '12px' }} >
            <Grid container sx={{ paddingLeft:'20px' }}>
                <Grid item md={12}>
                <BaseTextareaAutosize  minRows={5} />
                </Grid>
            </Grid>
            </Stack>

        </Stack>
    )
}





