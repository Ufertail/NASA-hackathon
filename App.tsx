import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

export default function App() {
  const [input, setInput] = useState("")
  const [secureText, setSecureText] = useState(true) 
  const [password, setPassword] = useState("admin") //hooks
  const [login, setLogin] = useState("")
  return (
    <View style={[styles.container, styles.red]}>
      <StatusBar style="auto" />

      <Text>{login}</Text>
      <TextInput onChangeText={(t) => setLogin(t)} placeholder='EnterSmth' placeholderTextColor="gray" style={styles.input}/>
      <TextInput secureTextEntry={secureText} onChangeText={(t) => setInput(t)} placeholder='EntrPsswrd' placeholderTextColor="gray" style={styles.input}/>

      <Pressable style={styles.pressable} onPress={() => password == input && login == "admin" ? alert(true) : alert(false) }>
        <Text>Check</Text>
      </Pressable>

      <Pressable style={styles.pressable} onPress={() => setSecureText(!secureText)}>
        <Text>Show or Hide password</Text>
      </Pressable>
      

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: "blue",
    backgroundColor: "white"
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 999,
    padding: 10,
    margin: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'purple',
    borderStyle: 'dashed',
    fontSize: 14,
  },
  pressable: {
    padding: 10,
    margin: 20,
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: 10,
  }
});

// kebab-case
// snake_case
// camelCase
// PascalCase