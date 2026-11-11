import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, ScrollView, Alert, Modal } from "react-native";

export default function Index() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [modal , setModal] = useState(false)

 
  return (
    <>
      <ScrollView>
        <View className="flex justify-center items-center h-screen gap-y-7">
          <Text>The name is {name}</Text>
          <Text>The email is {email}</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Write you name" className="border-3 w-100 rounded-[7px]"></TextInput>
          <TextInput value={email} onChangeText={setEmail} placeholder="Write you email" className="border-3 w-100 rounded-[7px]"></TextInput>

          <Button onPress={()=> setModal(true)} title="Click Me"></Button>

          <Modal visible={modal}>
            <View className="flex-1 justify-center items-center bg-black/50">

              <View className="bg-white p-8 rounded-xl w-80 gap-y-4">

                <Text className="text-xl font-bold">
                  User Information
                </Text>

                <Text>Name: {name}</Text>
                <Text>Email: {email}</Text>

                <Button
                  title="Close"
                  onPress={() => {setName(""), setEmail(""),  setModal(false)}}
                />

              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
}

