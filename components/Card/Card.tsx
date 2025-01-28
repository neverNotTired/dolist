import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { s } from './Card.style';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

type Index = number;

type HandlePress = (id: number) => void;

type HandleLongPress = (todo: Todo) => void;

export const Card = ({ todo, index, handlePress, handleLongPress }: { todo: Todo, index: Index, handlePress: HandlePress, handleLongPress: HandleLongPress }) => {

    return (
        <TouchableOpacity onLongPress={() => handleLongPress(todo)} style={[s.card, index === 0 && s.cardOne]} onPress={() => handlePress(todo.id)}>
            <View style={s.cardInner}>
                <Text style={[s.cardText, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
                    {todo.title}{index}
                </Text>
                {todo.completed && (
                    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4278da" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={s.check}>
                        <Polyline points="20 6 9 17 4 12" />
                    </Svg>
                )}
            </View>
        </TouchableOpacity>
    );
};