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

const userId = "678f4c732214726f83a51ae7";
const caseIds = ["678f816584f697ba9f2c6614", "678f813684f697ba9f2c6611", "678f811984f697ba9f2c660e"];
const caseNames = ["MurderAttempt#245", "DivorceCase#987", "LandDispute#067"];

const HearingSchedule = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [formData, setFormData] = useState({
    userId: userId,
    caseId: caseIds[0],
    caseName: caseNames[0],
    date: '',
    time: moment() // Initialize with a valid moment object
  });

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!formData.date || !formData.time) {
      return;
    }

    try {
      const response = await fetch('http://backend.lejit.ai/backend/api/hearing-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          time: formData.time.format('HH:mm') // Format time as string
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create hearing schedule');
      }

      const newEvent = {
        title: formData.caseName,
        start: moment(formData.date).hours(formData.time.hours()).minutes(formData.time.minutes()).toDate(),
        end: moment(formData.date).hours(formData.time.hours()).minutes(formData.time.minutes()).add(1, 'hours').toDate(),
        caseId: formData.caseId,
        userId: formData.userId,
      };

      setEvents([...events, newEvent]);
      setOpenDialog(false);
      setCaseIndex((prevIndex) => (prevIndex + 1) % caseIds.length);
      setFormData({
        userId: userId,
        caseId: caseIds[(caseIndex + 1) % caseIds.length],
        caseName: caseNames[(caseIndex + 1) % caseNames.length],
        date: '',
        time: moment()
      });
    } catch (error) {
      console.error('Error creating hearing schedule:', error);
    }
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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Time"
                value={formData.time}
                onChange={(newValue) => setFormData({ ...formData, time: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
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