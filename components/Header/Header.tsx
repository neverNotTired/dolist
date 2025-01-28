import { View, Text, Image } from 'react-native';
import { s } from './Header.style';

export const Header = () => {
    return (
        <View style={s.header}>
            <Image style={s.img} source={require('../../assets/logo.png')} resizeMode="contain"/>
            <Text style={s.subtitle}>You got some shit to do</Text>
        </View>
    );
};