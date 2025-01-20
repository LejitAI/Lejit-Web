import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const localizer = momentLocalizer(moment);

const HearingSchedule = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    time: null,
    location: ''
  });

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.time || !formData.location) {
      return;
    }

    const newEvent = {
      title: formData.title,
      start: moment(selectedDate).hours(formData.time.hours()).minutes(formData.time.minutes()).toDate(),
      end: moment(selectedDate).hours(formData.time.hours()).minutes(formData.time.minutes()).add(1, 'hours').toDate(),
      location: formData.location
    };

    setEvents([...events, newEvent]);
    setOpenDialog(false);
    setFormData({ title: '', time: null, location: '' });
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        height: '100%',
        width: '1104px'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 1, 
            color: '#343434',
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: '21px'
          }}
        >
          Hearing Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click on any time slot to schedule a new hearing
        </Typography>
      </Box>

      <Box sx={{ 
        height: 600, 
        bgcolor: 'background.paper',
        width: '100%'
      }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          selectable
          views={['month', 'week', 'day']}
          defaultView="month"
          step={60}
          style={{ 
            height: '100%',
            padding: '20px',
            borderRadius: '8px',
            width: '100%'
          }}
        />
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          Schedule New Hearing
          <IconButton onClick={() => setOpenDialog(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <TextField
              label="Hearing Title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              fullWidth
              required
            />

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Time"
                value={formData.time}
                onChange={(newValue) => setFormData(prev => ({ ...prev, time: newValue }))}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>

            <TextField
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              fullWidth
              required
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Schedule Hearing
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default HearingSchedule;
