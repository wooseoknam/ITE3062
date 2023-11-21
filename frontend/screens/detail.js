import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const Detail = ({ route }) => {
    const [data, setData] = useState([])
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
                let response = await fetch(`http://172.30.1.82:5000/test?date=${encodeURIComponent(route.params.day.dateString)}`, {
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

    useEffect(() => {
        fetch(`http://localhost:5000/detail?date=${encodeURIComponent(route.params.day.dateString)}`)
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, [])

    return (
        <View>
            <Text>{route.params.day.dateString}</Text>
            {Object.entries(data).map(([category, reps]) => (
              <View key={category}>
                <Text>{category}:</Text>
                {Array.isArray(reps) && reps.length > 0 ? (
                  reps.map((rep, index) => (
                    <Text key={index}>{index + 1}세트: {rep}회</Text>
                  ))
                ) : (
                  <Text></Text>
                )}
              </View>
            ))}
            <Button title="비디오 선택" onPress={pickVideo} />
            <Button title="비디오 업로드" onPress={uploadVideo} />
            <Text>{selectedVideo.uri}</Text>
        </View>
    )
}

export default Detail