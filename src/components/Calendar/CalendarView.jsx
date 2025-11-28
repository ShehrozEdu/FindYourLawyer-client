import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import apiService from '../../utility/apiService';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../utils/LoadingSkelton';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const { user, isLawyer } = useAuth();

  // Form state for new event
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
    type: 'consultation',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (user?._id) {
      fetchEvents();
    }
  }, [user, currentDate]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const startDate = startOfMonth(currentDate).toISOString();
      const endDate = endOfMonth(currentDate).toISOString();
      const response = await apiService.get(`/calendar/events?startDate=${startDate}&endDate=${endDate}`);
      if (response.data.status) {
        setEvents(response.data.events || []);
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      if (!eventForm.title || !eventForm.startTime || !eventForm.endTime) {
        toast.error('Please fill in all required fields');
        return;
      }

      const payload = {
        ...eventForm,
        startTime: eventForm.startTime.toISOString(),
        endTime: eventForm.endTime.toISOString()
      };

      const response = await apiService.post('/calendar/events', payload);
      if (response.data.status) {
        toast.success('Event created successfully');
        setIsEventDialogOpen(false);
        setEventForm({
          title: '',
          description: '',
          startTime: new Date(),
          endTime: new Date(Date.now() + 60 * 60 * 1000),
          type: 'consultation',
          location: '',
          notes: ''
        });
        fetchEvents();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await apiService.delete(`/calendar/events/${eventId}`);
      if (response.data.status) {
        toast.success('Event deleted successfully');
        setIsViewDialogOpen(false);
        setSelectedEvent(null);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return isSameDay(eventDate, date);
    });
  };

  const getEventColor = (type) => {
    const colors = {
      consultation: 'bg-blue-500',
      meeting: 'bg-green-500',
      court_hearing: 'bg-red-500',
      availability: 'bg-gray-500',
      other: 'bg-purple-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const daysInMonth = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Calendar</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next →
          </button>
          {isLawyer && (
            <button
              onClick={() => setIsEventDialogOpen(true)}
              className="px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90"
            >
              + New Event
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold dark:text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-600">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {daysInMonth.map((day, idx) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={idx}
                className={`min-h-24 p-2 border-r border-b border-gray-200 dark:border-gray-600 ${
                  !isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'
                } ${isToday ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                onClick={() => {
                  if (dayEvents.length > 0) {
                    setSelectedEvent(dayEvents[0]);
                    setIsViewDialogOpen(true);
                  } else if (isLawyer) {
                    setSelectedDate(day);
                    setEventForm(prev => ({
                      ...prev,
                      startTime: day,
                      endTime: new Date(day.getTime() + 60 * 60 * 1000)
                    }));
                    setIsEventDialogOpen(true);
                  }
                }}
              >
                <div className={`text-sm mb-1 ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'} ${isToday ? 'font-bold text-gmeshMain' : ''}`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event, eventIdx) => (
                    <div
                      key={event._id}
                      className={`text-xs p-1 rounded ${getEventColor(event.type)} text-white truncate cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      {format(new Date(event.startTime), 'HH:mm')} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={isEventDialogOpen} handler={setIsEventDialogOpen} size="lg" className="dark:bg-gray-700">
        <DialogHeader className="dark:text-white">Create New Event</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                placeholder="Event title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Time *
                </label>
                <DatePicker
                  selected={eventForm.startTime}
                  onChange={(date) => setEventForm({ ...eventForm, startTime: date })}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Time *
                </label>
                <DatePicker
                  selected={eventForm.endTime}
                  onChange={(date) => setEventForm({ ...eventForm, endTime: date })}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={eventForm.type}
                onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
              >
                <option value="consultation">Consultation</option>
                <option value="meeting">Meeting</option>
                <option value="court_hearing">Court Hearing</option>
                <option value="availability">Availability</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                placeholder="Event description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                placeholder="Event location"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsEventDialogOpen(false)}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateEvent}
            className="bg-gmeshMain hover:bg-opacity-90"
          >
            Create Event
          </Button>
        </DialogFooter>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewDialogOpen} handler={setIsViewDialogOpen} className="dark:bg-gray-700">
        <DialogHeader className="dark:text-white">
          {selectedEvent?.title}
        </DialogHeader>
        <DialogBody>
          {selectedEvent && (
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time</h4>
                <p className="text-gray-900 dark:text-white">
                  {format(new Date(selectedEvent.startTime), 'MMMM d, yyyy h:mm aa')} - 
                  {format(new Date(selectedEvent.endTime), 'h:mm aa')}
                </p>
              </div>
              {selectedEvent.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                  <p className="text-gray-900 dark:text-white">{selectedEvent.description}</p>
                </div>
              )}
              {selectedEvent.location && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h4>
                  <p className="text-gray-900 dark:text-white">{selectedEvent.location}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Type</h4>
                <span className={`px-2 py-1 text-xs rounded text-white ${getEventColor(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
              </div>
              {selectedEvent.client && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Client</h4>
                  <p className="text-gray-900 dark:text-white">
                    {selectedEvent.client.FirstName} {selectedEvent.client.LastName}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          {(selectedEvent?.lawyer?._id === user?._id || selectedEvent?.client?._id === user?._id) && (
            <Button
              variant="text"
              color="red"
              onClick={() => handleDeleteEvent(selectedEvent._id)}
              className="mr-1"
            >
              Delete
            </Button>
          )}
          <Button
            variant="text"
            onClick={() => setIsViewDialogOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CalendarView;

