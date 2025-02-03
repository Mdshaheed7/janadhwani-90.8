import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const MonthlySchedule = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  // Generate time slots from 8 AM to 8 PM with 2-hour frequency
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + (i * 1);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, '0')} ${period}`;
  });

  // Fetch schedules for the selected date
  const fetchSchedules = async (date) => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`YOUR_API_ENDPOINT/schedules/${date}`);
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Demo data for multiple dates
  const getDemoSchedule = (date) => {
    const demoSchedules = {
      '2025-01-04': {
        '08 AM': { event: 'Yoga Session', description: 'Join us for a refreshing morning yoga session.' },
        '12 PM': { event: 'Lunch Break', description: 'Time for a relaxing lunch break.' },
        '03 PM': { event: 'Introduction to AI', description: 'An introductory workshop on Artificial Intelligence.' },
      },
      '2025-01-05': {
        '08 AM': { event: 'Morning Run', description: 'Start your day with a healthy morning run.' },
        '12 PM': { event: 'Team Meeting', description: 'Meeting to discuss the project progress.' },
        '03 PM': { event: 'AI Workshop', description: 'Hands-on workshop on AI tools and techniques.' },
        '08 PM': { event: 'Evening Networking', description: 'Join our networking session with industry professionals.' },
      },
      '2025-01-06': {
        '12 PM': { event: 'Lunch with Client', description: 'Business lunch with a client to discuss new opportunities.' },
        '03 PM': { event: 'Product Demo', description: 'Product demo for potential investors.' },
      },
    };

    return demoSchedules[date] || {}; // Returns empty if no schedule for the given date
  };

  useEffect(() => {
    if (selectedDate) {
      // For demo purposes, using static data
      setSchedules(getDemoSchedule(selectedDate));
    }
  }, [selectedDate]);

  const renderTimeSlot = (time) => {
    const event = schedules[time] || '';
    if (!event) return null; // Don't render if no event

    return (
      <View key={time} style={styles.timeSlotContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.timelineDot} />
        <TouchableOpacity
          style={styles.eventContainer}
          onPress={() => handleEventPress(event)}
        >
          <Text style={styles.eventText}>{event.event}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEvent('');
  };

  return (
    <LinearGradient
      colors={['#264796', '#2c4ca2']} // Using the correct background colors
      style={styles.container}
    >
      {/* Header with "Up Next" title and back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Schedule</Text>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#4a90e2' }
          }}
          theme={{
            calendarBackground: '#3b5ab3',
            textSectionTitleColor: '#ffffff',
            selectedDayBackgroundColor: '#4a90e2',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#4a90e2',
            dayTextColor: '#ffffff',
            textDisabledColor: '#666666',
            monthTextColor: '#ffffff',
            arrowColor: '#ffffff',
          }}
        />
      </View>

      {/* No events message if no events exist for the selected date */}
      {Object.keys(schedules).length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events scheduled yet. Stay tuned for updates!</Text>
        </View>
      ) : (
        <ScrollView style={styles.scheduleContainer}>
          <View style={styles.timeline}>
            {timeSlots.map(time => renderTimeSlot(time))}
          </View>
        </ScrollView>
      )}

      {/* Event Description Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedEvent.event}</Text>
            <Text style={styles.modalDescription}>{selectedEvent.description}</Text>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  calendarContainer: {
    backgroundColor: '#303F9F',
    borderRadius: 10,
    margin: 20,
    overflow: 'hidden',
  },
  scheduleContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  noEventsContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  timeline: {
    paddingBottom: 20,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  timeContainer: {
    width: 70,
  },
  timeText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4a90e2',
    marginHorizontal: 10,
  },
  eventContainer: {
    flex: 1,
    backgroundColor: '#ffffff30',
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  eventText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MonthlySchedule;
