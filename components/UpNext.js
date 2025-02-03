import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UpNext = ({ navigation }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch schedule data from API
  const fetchSchedule = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT/schedule');
      const data = await response.json();
      setSchedule(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  // Demo data structure
  const demoSchedule = [
  ];

  const renderScheduleItems = () => {
    const data = schedule.length > 0 ? schedule : demoSchedule;

    if (data.length === 0) {
      return (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events scheduled yet. Stay tuned!</Text>
        </View>
      );
    }

    return data.map((item, index) => (
      <View key={index} style={styles.timeSlotContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.timelineDot} />
        <TouchableOpacity
          onPress={() => {
            setSelectedActivity(item.description);
            setModalVisible(true);
          }}
          style={styles.eventContainer}
        >
          <Text style={styles.eventText}>{item.activity}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <LinearGradient
      colors={['#264796', '#1a3c7d']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Up Next</Text>
      </View>

      <ScrollView style={styles.scheduleContainer}>
        <View style={styles.timeline}>
          {loading ? (
            <Text style={styles.loadingText}>Loading schedule...</Text>
          ) : (
            renderScheduleItems()
          )}
        </View>
      </ScrollView>

      {/* Modal for activity description */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>{selectedActivity}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264796',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 40,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  scheduleContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
    fontSize: 16,
    color: '#fff',
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
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  noEventsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noEventsText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalBackground: {
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
    maxHeight: '60%',
    justifyContent: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default UpNext;
