import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "axios";

export default function TabOneScreen() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  if (!status || !status.granted) {
    return (
      <View style={styles.container}>
        <Text>Give camera permission</Text>
        <Button title="Enable camera" onPress={requestPermission} />
      </View>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const recognizeImage = async () => {
    if (image) {
      const data = new FormData();
      // @ts-ignore
      data.append("image", {
        name: "image",
        type: image.type,
        uri: image.uri,
      });

      fetch(`https://imaaager.onrender.com/api/upload`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose image from gallery" onPress={pickImage} />
      <Button title="Capture image" onPress={captureImage} />
      {image && (
        <View>
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <Button title="process" onPress={recognizeImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
