import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Stack, 
  InputAdornment, 
  TextField, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  Checkbox, 
  OutlinedInput,
  ListItemText 
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

InvoiceTableToolbar.propTypes = {
  filterName: PropTypes.string,
  filterService: PropTypes.string,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  onFilterName: PropTypes.func,
  onFilterEndDate: PropTypes.func,
  onFilterService: PropTypes.func,
  onFilterStartDate: PropTypes.func,
  optionsService: PropTypes.arrayOf(PropTypes.string),
};

export default function InvoiceTableToolbar({
  optionsService,
  filterStartDate,
  filterEndDate,
  filterName,
  filterService,
  onFilterName,
  onFilterService,
  onFilterStartDate,
  onFilterEndDate,
}) {

  const [personName, setPersonName] = useState([]);
  const [sortingService, setSortingService] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const onSortingService = (event) => {
    setSortingService(event.target.value)
  };
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }} justifyContent={'space-between'} >
      <Stack direction={'row'} width={'90%'} alignItems={'center'} columnGap={1}>
        <TextField
          fullWidth
          select
          label="Service type"
          value={filterService}
          size='small'
          onChange={onFilterService}
          SelectProps={{
            MenuProps: {
              sx: { '& .MuiPaper-root': { maxHeight: 260 } },
            },
          }}
          sx={{
            maxWidth: { md: INPUT_WIDTH },
            textTransform: 'capitalize',
          }}
        >
          {optionsService.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControl size='small' sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Assigned By</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Assigned By" />}
            renderValue={(selected) => selected.join(', ')}
            // MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          label="Start date"
          value={filterStartDate}
          onChange={onFilterStartDate}
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />

        <DatePicker
          label="End date"
          value={filterEndDate}
          onChange={onFilterEndDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size='small'
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />

        <TextField
          width={10}
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          size="small"
          placeholder="Search client or invoice number..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{float:'left',padding: '7px 25px !important'}}
        >
          Search
        </Button>
      </Stack>
      
      <Stack direction={'row'} width={'10%'} alignItems={'center'}>
        <TextField
          fullWidth
          select
          label="Sort Type"
          value={sortingService}
          size='small'
          onChange={onSortingService}
          // input={<OutlinedInput label="Sort Type" />}
          SelectProps={{
            MenuProps: {
              sx: { '& .MuiPaper-root': { maxHeight: 260 } },
            },
          }}
          sx={{
            maxWidth: { md: INPUT_WIDTH },
            textTransform: 'capitalize',
          }}
        >
          <MenuItem
            key={'Last Modified'}
            value={'Last Modified'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {'Last Modified'}
          </MenuItem>
          <MenuItem
            key={'Last Created'}
            value={'Last Created'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {'Last Created'}
          </MenuItem>
        </TextField>
      </Stack>

    </Stack>
    </>
    
  );
}
