import { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const Upload = () => {
    const [selectedVideo, setSelectedVideo] = useState({uri: ''});
    const navigation = useNavigation();

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
          console.log(E);
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
                let response = await fetch("http://localhost:5000/test", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                });
                navigation.navigate('Calendar');
            }
            catch (error) {
                console.log('error : ' + error);
                return error;
            }
        }
    };

    return (
        <View style={styles.container}>
            <Button title="비디오 선택" onPress={pickVideo} />
            <Button title="비디오 업로드" onPress={uploadVideo} />
            <Text>{selectedVideo.uri}</Text>
        </View>
    )
}

export default Upload;
