import { Text, View } from "react-native";
import { StyleSheet, ScrollView} from "react-native"
import { Stack } from "react-native"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>
        welcome to our new assignment
      </Text>

      const styles = StyleSheet.create({
        container:{
          flex:9,
          justifyContent: "center",
          paddingHorizontal:34

        }
        title:{
          flex:3,
          paddingHorizontal:24,
          justifyContent: "left"
          
        }
      })
      
    </View>
  );
}
