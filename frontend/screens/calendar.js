import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const Calendar = () => {
    const [data, setData] = useState([]);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ko-KR');
    };
    const fetchData = async () => {
        try {
          let response = await fetch("http://172.30.1.83:5000/");
          let result = await response.json();
          setData(result);
        } catch (error) {
          console.log('error : ' + error);
        }
    };

    useEffect(() => {
        // fetch('http://172.30.1.83:5000/')
        // .then(response => response.json())
        // .then(response => {
        //     setData(response)
        // })
        fetchData()
    }, [])

    return (
        <View>
            {Object.entries(data).map(([date, items]) => (
                <View key={date}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Date: {formatDate(date)}</Text>
                    {items.map(([id, value1, value2, date, type]) => (
                        <View key={id}>
                            <Text>{type}: {value1}회</Text>
                        </View>
                    ))}
                    <Text></Text>
                </View>
            ))}
        </View>
    )
}

export default Calendar;