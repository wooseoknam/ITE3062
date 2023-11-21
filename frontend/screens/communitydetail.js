import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const CommunityDetail = ( { route }) => {
    const { id } = route.params;
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/community_detail?id=${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(response => {
            setQuestion(response['question'][0])
            setAnswer(response['answer'])
        })
    }, [])

    return (
        <GestureHandlerRootView>
            <View>
                <Text>제목: {question[1]}</Text>
                <Text>내용: {question[2]}</Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                {answer.map((item, index) => (
                    <Text key={index}>{item[2]}</Text>
                ))}
                
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <TextInput 
                    onChangeText={text => setText(text)}
                    value={text}
                    placeholder="Type your answer here"
                />
            </View>
        </GestureHandlerRootView>
    )
}

export default CommunityDetail