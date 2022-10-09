import {
  View,
  Text,
  Button,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Items, COLOURS } from "../database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Home = ({ navigation }) => {
  const [obats, setObats] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);
  const getDataFromDB = () => {
    let obatList = [];
    for (let i = 0; i < Items.length; i++) {
      obatList.push(Items[i]);
    }
    setObats(obatList);
  };

  const ObatCard = ({ obat }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductInfo", { obatID: obat.id })}
        style={{ width: "48%", marginVertical: 10 }}
        key={obat.id}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: "relative",
            alignItems: "center",
          }}
        >
          <Image
            source={obat.productImage}
            style={{
              width: "100%",
              height: 100,
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
        </View>
        <Text style={{ fontWeight: "500", fontSize: 16 }}>
          {obat.productName}
        </Text>
        <Text style={{ color: COLOURS.backgroundDark, fontSize: 12 }}>
          Rp.{obat.productPrice}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{ width: "100%", height: "100%", backgroundColor: COLOURS.white }}
    >
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <Text>Faskes 1</Text>
          <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
              }}
            >
              Stock Obat
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: "400",
                opacity: 0.4,
                marginLeft: 10,
              }}
            >
              {obats.length}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {obats.map((obat) => {
            return (
              <>
                <ObatCard obat={obat} key={obat.id} />
              </>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
