import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const Community = ({navigation}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/community')
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, [])

    return (
        <View>
            {data.map((item, index) => (
                <Text key={index} onPress={() => navigation.navigate('CommunityDetail', { id: item[0] })}>{item[1]}</Text>
            ))}
        </View>
    )
}

export default Community