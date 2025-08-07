import { FlatList, Text, View } from "react-native";

export default function Index() {

  const todoData = [

  ]




  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        
        alignItems: "center",
      }}
    >
      <FlatList data={todoData} keyExtractor={(item) =>} />
    </View>
  );
}
