import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState("");

  const [camera, setCamera] = useState<any>(null);

  const [status, requestPermission] = Camera.useCameraPermissions();

  if (!status || !status.granted) {
    return (
      <View style={styles.container}>
        <Text>Give camera permission</Text>
        <Button title="Enable camera" onPress={requestPermission} />
      </View>
    );
  }

  const handleFlipCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const handleCapture = async () => {
    if (camera) {
      const result = await camera.takePictureAsync();
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <Camera style={{ flex: 1, width: "100%" }} type={type} ref={(ref) => setCamera(ref)}>
        {image && <Image source={{ uri: image }} width={100} height={100} style={{ borderWidth: 1, borderColor: "red" }} />}
        <Button title="Flip camera" onPress={handleFlipCamera} />
        <Button title="Capture" onPress={handleCapture} />
      </Camera>
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
