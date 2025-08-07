import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox"

export default function Index() {

  const todoData = [
    {
      id : 1,
      title : "Todo 1",
      isDone : false,
    },
    {
      id : 2,
      title : "Todo 2",
      isDone : false,
    },{
      id : 3,
      title : "Todo 3",
      isDone : false,
    },{
      id : 4,
      title : "Todo 4",
      isDone : false,
    },{
      id : 5,
      title : "Todo 5",
      isDone : false,
    },{
      id : 6,
      title : "Todo 6",
      isDone : false,
    },
  ];




  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style = {styles.header}>
        <TouchableOpacity onPress={() =>{alert('clicked clicked menu!')}}>
          <Ionicons name="menu" size={24} color={'#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {alert('you clicked profile!')}}>
          <Image source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male'}} style = {{width:40, height: 40, borderRadius:20}} />
        </TouchableOpacity>
      </View>
      <View style = {styles.searchBar}>
        <Ionicons name="search" size={24} color={'#333'} />
        <TextInput placeholder="Search" style={styles.searhInput} />
      </View>
      <FlatList data={todoData} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
        <View style={styles.todoContainer}>
          <View style={styles.todoInfoContainer}>
            <Checkbox value={item.isDone} />
            <Text style={[styles.todoText, item.isDone && {textDecorationLine:"line-through"}]}>{item.title}</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            alert("Deleted " + item.id)
          }}>
            <Ionicons name="trash" size={24} color='red' />
          </TouchableOpacity>
        </View>
      )} />
      <View style={styles.footer}>
        <TextInput placeholder="Add new todo!!" style={styles.newTodoInput} />
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Ionicons name="add" size={34} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    marginBottom:20,
  },
  searhInput:{
    flex:1, 
    fontSize:16,
    color: '#333',
  },
  todoContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer:{
    flexDirection: 'row',
    gap:10,
    alignItems: 'center',
  },
  todoText:{
    fontSize: 16,
    color: '#333',
  },
  footer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newTodoInput:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton:{
    backgroundColor:'green',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});