import { Stack,Alert,Typography } from "@mui/material"
import { Link } from "react-router-dom";


const TopAlert = (props) => {
    return (
        <Stack sx={{alignItems : 'center', justifyContent : 'center' }}>
            <Alert sx={{ padding : '0px 16px',width:'auto',alignItems : 'center', justifyContent : 'center', background : props.bgcolor, color : 'white' }} severity="warning">
                <Typography color={'#fff'} style={{ textDecoration : 'none' }}>{props.content && props.content} <Link to={"/dashboard/app"} style={{ cursor : 'pointer' }}>here</Link>.</Typography>
            </Alert>
        </Stack>
    )
    
}

export default TopAlert;
