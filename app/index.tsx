import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
}

export default function Index() {

  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    }, {
      id: 3,
      title: "Todo 3",
      isDone: false,
    }, {
      id: 4,
      title: "Todo 4",
      isDone: false,
    }, {
      id: 5,
      title: "Todo 5",
      isDone: false,
    }, {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  const [todos, settodos] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [oldTodos, setOldtodos] = useState<TodoType[]>([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem('my-todo')
        if (todos !== null) {
          settodos(JSON.parse(todos));
          setOldtodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);
  const addTodo = async () => {
    if (!todoText.trim()) return;
    try {

      const newTodo = {
        id: Date.now(),
        title: todoText.trim(),
        isDone: false,
      };
      const updatedTodos = [...todos, newTodo];
      settodos(updatedTodos);
      setOldtodos(updatedTodos);
      await AsyncStorage.setItem('my-todo', JSON.stringify(updatedTodos));
      setTodoText('');
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      settodos(newTodos);
      setOldtodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id == id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      settodos(newTodos);
      setOldtodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (query: string) => {
    if (query == '') {
      settodos(oldTodos);
    } else {
      const filterTodos = todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
      settodos(filterTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { alert('clicked clicked menu!') }}>
          <Ionicons name="menu" size={24} color={'#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { alert('you clicked profile!') }}>
          <Image source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male' }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={'#333'} />
        <TextInput placeholder="Search" value={searchQuery} onChangeText={(text) => setSearchQuery(text)} style={styles.searchInput} />
      </View>
      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <TodoItem todo={item} deleteTodo={deleteTodo} handleTodo={handleDone} />
        }
      />
      <KeyboardAvoidingView style={styles.footer} behavior="padding" keyboardVerticalOffset={10}>
        <TextInput placeholder="Add new todo!!" value={todoText} onChangeText={(text) => setTodoText(text)} style={styles.newTodoInput} />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={'#fff'} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TodoItem = ({ todo, deleteTodo, handleTodo }: { todo: TodoType; deleteTodo: (id: number) => void; handleTodo: (id: number) => void; }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <Checkbox value={todo.isDone} onValueChange={() => handleTodo(todo.id)} color={todo.isDone ? "green" : undefined} />
        <Text style={[styles.todoText, todo.isDone && { textDecorationLine: "line-through" }]}>{todo.title}</Text>
      </View>
      <TouchableOpacity onPress={() => {
        deleteTodo(todo.id);
        alert("Deleted " + todo.id)
      }}>
        <Ionicons name="trash" size={24} color='red' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 16 : 8,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});