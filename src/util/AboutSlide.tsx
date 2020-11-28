import React from "react";
import { View } from "react-native";

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

export default aboutslide