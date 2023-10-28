import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [data, setData] = useState(0);

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        // aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedVideo(result.assets[0]);
      } else {
        alert('You did not select any image.');
      }
    } catch (E) {
      // console.log(E);
    }
  };

  const uploadVideo = async () => {
    if (selectedVideo) {
      const formData = new FormData();
        formData.append('video', {
          uri: selectedVideo.uri,
          type: 'video/mp4',
          name: 'video.mp4',
        });

        try {
            let response = await fetch("http://172.30.1.44:5000/test", {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            });
            // console.log(await response.json())
            alert(await response.json() + '번 반복!!')
            // return await response.json();
        }
        catch (error) {
            console.log('error : ' + error);
            return error;
        }
    }
  };

  // useEffect(() => {
  //   fetch('http://172.30.1.43:5000/')
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json)
  //     setData(json)
  //     // return json;
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }, [])

  return (
    <View style={styles.container}>
      <Button title="비디오 선택" onPress={pickVideo} />
      <Button title="비디오 업로드" onPress={uploadVideo} />
      <StatusBar style="auto" />
      {/* <Text>{data[0][3]}</Text> */}
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
});
