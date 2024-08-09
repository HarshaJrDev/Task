import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function App() {
  const route = useRoute();
  const { name, age } = route.params;

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [stepsData, setStepsData] = useState([]);
  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    const getStepsForCurrentMonth = async () => {
      const end = new Date();
      const start = new Date(end.getFullYear(), end.getMonth(), 1);

      let stepsArray = [];
      let totalStepsCount = 0;
      for (let day = start.getDate(); day <= end.getDate(); day++) {
        const startDay = new Date(start.getFullYear(), start.getMonth(), day);
        const endDay = new Date(start.getFullYear(), start.getMonth(), day + 1);

        const result = await Pedometer.getStepCountAsync(startDay, endDay);
        const steps = result.steps || 0;
        stepsArray.push({
          date: startDay.toLocaleDateString(),
          steps
        });

        totalStepsCount += steps;
      }
      setStepsData(stepsArray);
      setTotalSteps(totalStepsCount);
    };

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));
      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
        if (pastStepCountResult) {
          setPastStepCount(pastStepCountResult.steps);
        }

        return Pedometer.watchStepCount(result => {
          setCurrentStepCount(result.steps);
        });
      }
    };

    let subscription;
    subscribe().then(sub => subscription = sub);
    getStepsForCurrentMonth();

    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome, {name} ({age})!</Text>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken as of now: {currentStepCount}</Text>
      <Text>Total steps from start of the month to today: {totalSteps}</Text>
      <FlatList
        data={stepsData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.stepItem}>
            <Text>{item.date}: {item.steps} steps</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:height*0.03,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    bottom:200
  },
  stepItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
}); 