import { useEffect, useState } from "react"
import { View, Text } from "react-native"

const CommunityDetail = ( { route }) => {
    const { id } = route.params;
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://172.30.1.71:5000/community_detail?id=${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(response => {
            setData(response[0]);
        })
    }, [])

    return (
        <View>
            <Text>제목: {data[1]}</Text>
            <Text>내용: {data[2]}</Text>
        </View>
    )
}

export default CommunityDetail