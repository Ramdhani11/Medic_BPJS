import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ViewBase,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOURS, Items } from "../database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductInfo = ({ route, navigation }) => {
  const { obatID } = route.params;
  const [obat, setObat] = useState({});
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);
  const getDataFromDB = async () => {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id == obatID) {
        await setObat(Items[i]);
        return;
      }
    }
  };
  // Keranjang
  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show("Telah Ditambahkan Ke Keranjang", ToastAndroid.SHORT);
        navigation.navigate("Home");
      } catch (err) {
        return err;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems");
        ToastAndroid.show("Telah Ditambahkan Ke Keranjang", ToastAndroid.SHORT);
        navigation.navigate("Home");
      } catch (err) {
        return err;
      }
    }
  };

  // render

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={obat.productImage}
            style={{ width: "100%", height: 200 }}
          />
        </View>
        <View
          style={{
            marginVertical: 14,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="plus-circle"
              style={{ fontSize: 15, color: COLOURS.blue }}
            />
            <Text
              style={{ fontSize: 12, color: COLOURS.black, marginLeft: 10 }}
            >
              Obat-Obatan
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", letterSpacing: 1 }}
            >
              {obat.productName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                letterSpacing: 1,
                marginTop: 12,
                color: COLOURS.backgroundDark,
              }}
            >
              {obat.description}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{ fontSize: 16, color: COLOURS.blue }}
                />
              </View>
              <Text style={{ color: COLOURS.backgroundDark, fontSize: 12 }}>
                CiMerah No.12 {"\n"}Rt 01 Rw 06 Tasikmalaya
              </Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{ fontSize: 18, color: COLOURS.backgroundDark }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Rp {obat.productPrice}
            </Text>
            <Text style={{ fontSize: 13, color: COLOURS.backgroundDark }}>
              Ongkir Rate 4% ~ Rp {obat.productPrice / 4} (Tergantung Jarak)
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: "8%",
          position: "absolute",
          bottom: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => addToCart(obat.id)}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: COLOURS.blue,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "#fff",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Tambah
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
