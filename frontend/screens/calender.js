import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const Calender = () => {
    const [data, setData] = useState();

    useEffect(() => {
        fetch('http://172.30.1.54:5000/')
        .then(response => {
            console.log(response.json())
        })
    }, [])

    return (
        <View>
            <Text>123</Text>
        </View>
    )
}

export default Calender;