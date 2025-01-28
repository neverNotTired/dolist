import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Polyline, Path } from 'react-native-svg';
import { s } from './Add.style';

interface AddProps {
    onPress: () => void;
}

export const Add = ({ onPress }: AddProps) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                s.btn,
                ]}
                onPress={onPress}
            >
                <Svg style={s.svg} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4278da" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M12 5V19M5 12H19" stroke="#4278da" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
            </TouchableOpacity>
        </View>
    );
};