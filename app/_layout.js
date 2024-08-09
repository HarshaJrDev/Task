import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName='Info'>
    
      <Stack.Screen 
        name="Info" 
      />
      <Stack.Screen 
        name="Home" 
        options={{ 
          headerShown: false 
        }} 
      />
    </Stack>
  );
}
