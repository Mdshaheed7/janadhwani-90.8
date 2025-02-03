import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  // Import MaterialCommunityIcons
import Svg, { Line } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const HomePage = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState(Array(60).fill(0.2));
  const [volume, setVolume] = useState(0.8);
  const [sound, setSound] = useState(null);
  const [isEnglish, setIsEnglish] = useState(true); // State for language toggle

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Cleanup the sound resource
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    let animationFrame;

    if (isPlaying) {
      const animate = () => {
        setVisualizerBars(Array(60).fill().map(() => Math.random() * 0.8 + 0.2));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
      setVisualizerBars(Array(60).fill(0.2));
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying]);

  const togglePlayback = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          {
            uri: 'https://d3n2o48cmfppr2.cloudfront.net/svymradio.m3u8',
          },
          { shouldPlay: true, volume }
        );
        setSound(newSound);
        setIsPlaying(true);

        // Set playback finish listener
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const dialSize = windowWidth - 32;

  const CircularVisualizer = () => {
    return (
      <Svg style={[StyleSheet.absoluteFill]} viewBox="0 0 100 100">
        {visualizerBars.map((height, index) => {
          const angle = (index * 360) / 60;
          const radians = (angle * Math.PI) / 180;
          const barLength = 15 * height;
          const innerRadius = 30;
          const x1 = 50 + Math.cos(radians) * innerRadius;
          const y1 = 50 + Math.sin(radians) * innerRadius;
          const x2 = 50 + Math.cos(radians) * (innerRadius + barLength);
          const y2 = 50 + Math.sin(radians) * (innerRadius + barLength);

          return (
            <Line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="0.5"
              opacity={0.6 + height * 0.4}
            />
          );
        })}
      </Svg>
    );
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <Pressable onPress={() => navigation.navigate('Profile')}>  {/* Navigate to Profile */}
          <MaterialCommunityIcons name="menu" size={24} color="#264796" />  {/* Menu icon */}
        </Pressable>
        <Text style={styles.navTitle}>{isEnglish ? 'Janadhwani' : 'ಜನಧ್ವನಿ'}</Text>  {/* Language Toggle */}
        <Pressable onPress={toggleLanguage}>
          <Text style={styles.languageToggle}>{isEnglish ? 'ಕನ್ನಡ' : 'English'}</Text>
        </Pressable>
      </View>

      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>SVYM</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.frequency}>{isEnglish ?'community radio station ': 'ಸಮುದಾಯ ರೇಡಿಯೋ ಕೇಂದ್ರ'}</Text>
      </View>

      <View style={[styles.dialContainer, { width: dialSize, height: dialSize }]}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <CircularVisualizer />
            <View style={styles.centerCircle}>
              <Text style={styles.kannadaText}>ಜನಧ್ವನಿ</Text>
              <Text style={styles.frequencyCircle}>90.8 MHz</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.nowPlaying}>
        <Text style={styles.songTitle}>{isPlaying ? (isEnglish ? 'Now Playing' : 'ಆಗುತ್ತಿರುವ ಹಾಡು') : (isEnglish ? 'Paused' : 'ನಿಂತಿದೆ')}</Text>
      </View>

      <View style={styles.volumeControl}>
        <Feather name="volume" size={20} color="#000" />
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={(value) => {
            setVolume(value);
            if (sound) {
              sound.setVolumeAsync(value);
            }
          }}
          minimumTrackTintColor="#1E3A8A"
          maximumTrackTintColor="#D1D5DB"
          thumbTintColor="#1E3A8A"
        />
        <Feather name="volume-2" size={20} color="#000" />
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.skipButton}>
          <Feather name="skip-back" size={24} color="#666" />
        </Pressable>

        <Pressable style={styles.playButton} onPress={togglePlayback}>
          <Feather name={isPlaying ? 'pause' : 'play'} size={24} color="#000" />
        </Pressable>

        <Pressable style={styles.skipButton}>
          <Feather name="more-horizontal" size={24} color="#666" />
        </Pressable>
      </View>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => navigation.navigate('UpNext')}>
          <Text style={styles.navText}>{isEnglish ? 'Up Next' : 'ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ'}</Text>
        </Pressable>
        <View style={styles.divider}></View> {/* Divider */}
        <Pressable onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.navText}>{isEnglish ? 'Schedule' : 'ವೇಳಾಪಟ್ಟಿ'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FF',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 40,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#264796',
    textAlign: 'center',
    flex: 1,
  },
  languageToggle: {
    fontSize: 16,
    color: '#264796',
    paddingHorizontal: 10,
  },
  stationInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginVertical: 20,
  },
  stationName: {
    fontWeight: '600',
    fontSize: 24,
    color: '#264796',
  },

  frequency: {
    color: '#264796',
  },
  dialContainer: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  outerCircle: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 20,
    borderColor: 'white',
    padding: 16,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
  },
  innerCircle: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'rgba(30, 58, 138, 0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  centerCircle: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    right: '25%',
    bottom: '25%',
    borderRadius: 999,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  kannadaText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  frequencyCircle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  nowPlaying: {
    paddingHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#264796',
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    marginBottom: 24,
    width: '100%',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  skipButton: {
    padding: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    backgroundColor: 'white',
    elevation: 2,
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#264796',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#264796',
    marginHorizontal: 10,
  },
});

export default HomePage;
