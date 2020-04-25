import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Keyboard,
} from "react-native";

export default function App() {
  const [offset] = useState(
    new Animated.ValueXY({
      x: 0,
      y: 95,
    })
  );

  const [opacity] = useState(new Animated.Value(0));

  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        speed: 1,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        speed: 1,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 50,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 50,
      }),
    ]).start();
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Animated.Image
            source={require("./src/assets/logo.png")}
            style={{
              width: logo.x,
              height: logo.y,
            }}
          />
        </View>

        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacity,
              transform: [{ translateY: offset.y }],
            },
          ]}
        >
          <Text style={styles.textLogon}>Faça seu Logon</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={() => {}}
          />
          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.textRegister}>Novo por aqui?</Text>
          <TouchableOpacity style={styles.btnRegister}>
            <Text style={styles.registerText}>Crie uma conta gratuita</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 50,
  },
  textLogon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    height: 60,
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    marginTop: 10,
    backgroundColor: "#35aaff",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
  },
  textRegister: {
    fontWeight: "700",
    marginTop: 20,
    color: "#f5f5f5",
  },
  btnRegister: {
    marginTop: 6,
  },
  registerText: {
    color: "#f5f5f5",
    fontSize: 14,
  },
});
