import { View, Text, TouchableOpacity } from 'react-native';
import { s } from './Footer.style';

// Define the Todo type
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface FooterProps {
    tab: string;
    onPress: (tab: string) => void;
    todoList: Todo[];
}

export function Footer({ tab, onPress, todoList } : FooterProps) {

    const countByStatus = todoList.reduce((acc, todo) => {
        acc.all++;
        todo.completed ? acc.done++ : acc.inprogress++;
        return acc;
    }, { all: 0, inprogress: 0, done: 0 });

    function getTextStyle(tabName: string) {
        return {
            fontWeight: 'bold' as const,
            color: tabName === tab ? '#2F76E5' : 'black'
        };
    }

    function handleSetSelectedTab(tab: string) {
        onPress(tab);
    }

    return (
        <View style={s.footer}>
            <TouchableOpacity
                style={[
                s.baseStyle,
                ]}
                onPress={() => handleSetSelectedTab('all')}
            >
                <Text style={getTextStyle('all')}>
                All ({countByStatus.all})
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                s.baseStyle,
                ]}
                onPress={() => handleSetSelectedTab('inprogress')}
            >
                 <Text style={getTextStyle('inprogress')}>
                In Progress ({countByStatus.inprogress})
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                s.baseStyle,
                ]}
                onPress={() => handleSetSelectedTab('done')}
            >
                 <Text style={getTextStyle('done')}>
                Done ({countByStatus.done})
                </Text>
            </TouchableOpacity>
        </View>
    );
};