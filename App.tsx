import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SetStateAction, useState } from 'react';

export default function App() {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string>('Starter');

  const [menu, setMenu] = useState<{ dishName: string, description: string, price: string, course: string }[]>([]);

  const handleSave = () => {
    const newDish = { dishName, description, price, course };
    setMenu([...menu, newDish]);

    // Clear inputs after saving
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.menuTitle}>Menu App</Text>
      </View>

      <View style={styles.listView}>
        {menu.length === 0 ? (
          <Text style={styles.emptyText}>No dishes added yet.</Text>
        ) : (
          menu.map((dish, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.menuText}>{dish.course}: {dish.dishName}</Text>
              <Text style={styles.menuText}>{dish.description}</Text>
              <Text style={styles.menuText}>${dish.price}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.userInputView}>
        <TextInput
          style={styles.input}
          placeholder='Dish name'
          value={dishName}
          onChangeText={setDishName}
        />

        <TextInput
          style={styles.input}
          placeholder='Description'
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder='Price'
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Fixed Picker with correct onValueChange and selectedValue */}
        <Picker
          selectedValue={course}
          style={styles.picker} // Applying picker-specific style
          onValueChange={(itemValue: SetStateAction<string>) => setCourse(itemValue)} // Update course on change
        >
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main" value="Main" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>

        <TouchableHighlight style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}> Save Dish </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  headingContainer: {
    backgroundColor: '#BDB5D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%'
  },
  menuTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#5B3E96',
  },
  listView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
  },
  userInputView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 15,
    backgroundColor: '#CBC3E3',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: 'black',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 5,
    color: 'black',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 40,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
