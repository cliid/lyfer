import React from "react";
import { View, Text, Dimensions, StyleSheet} from "react-native";

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    container: {},
})
interface SlideProps {
    label: string;
    right?: boolean;
}

const aboutSlide = ({label, right}: SlideProps) => {
    return (
        <View style={{flex:1}}>
            <Text>{label}</Text>
        </View>
    );
};

export default aboutSlide