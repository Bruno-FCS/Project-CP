import { useRef } from "react";
import { Image, Animated, Pressable, Easing } from "react-native";

const LogoTitle = ({ navigation }) => {
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateInterpolation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleAnimation = () => {
    Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      rotate.setValue(0);
      navigation.navigate("Home");
    }, 1000);
  };

  return (
    <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
      <Pressable onPress={handleAnimation}>
        <Image
          style={[{ height: 50 }, { marginRight: 10 }, { marginBottom: 5 }]}
          source={require("../assets/quickShopLogo.png")}
          resizeMode="contain"
        />
      </Pressable>
    </Animated.View>
  );
};

export default LogoTitle;
