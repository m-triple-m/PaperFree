import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, Card, Divider, IconButton } from "react-native-paper";
import CookingFood from "./CookingFood";

const CurrentOrder = ({
  visible,
  setVisible,
  setCurrentOrder,
  currentOrder,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const displayOrders = () => {


    return currentOrder.map(({ item, qty }) => {
      return (
        <View style={styles.orderItem} key={item.id}>
          <View style={styles.orderDetails}>
            <Text style={styles.orderItemTitle}>{item.obj.title}</Text>
            <Text style={styles.orderItemPrice}>
              ₹{item.obj.price} x {qty}
            </Text>
          </View>
          <Image source={{ uri: item.obj.image }} style={styles.image} />
        </View>
      );
    });
  };


  return (
    <Modal
      visible={visible}
      onRequestClose={(e) => setVisible(false)}
      animationType="slide"
    >
      <CookingFood visible={orderPlaced} setVisible={setOrderPlaced} />
      <View style={styles.container}>
        <View style={{flex: 3}}>

        <View style={styles.header}>
          <View style={{}}>
            <Text style={styles.title}>Order Summary</Text>
          </View>
          <IconButton icon="close" onPress={(e) => setVisible(false)} />
        </View>

        {/* <Image source={{ uri: menu.obj.image }} style={styles.image} />
        <Text style={styles.price}>₹{menu.obj.price}/-</Text>
      <Text style={styles.qty}>per {menu.obj.qty}</Text> */}
        {displayOrders()}
      </View>
        <Divider/>
        <View style={styles.orderTotal}>
          <Text style={styles.orderTotalText}>Total</Text>
          <Text style={styles.orderTotalPrice}>₹{currentOrder.reduce((acc, {item, qty}) => acc + (item.obj.price * qty), 0)}</Text>
          </View>
          <Button color="#fff" style={styles.orderBtn} onPress={e => setOrderPlaced(true)}>PLACE ORDER</Button>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // marginBottom: 10,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  qty: {
    fontSize: 20,
    color: "#777",
  },
  category: {
    fontSize: 20,
    color: "gray",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    flex: 1,
    borderRadius: 10,
    // marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom : 10,
    borderRadius : 10,
  },
  orderItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderItemPrice: {
    fontSize: 20,
    color: "#777",
  },
  orderDetails: {
    flex: 2,
    flexDirection: "column",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  orderTotal: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  orderTotalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderTotalPrice: {
    fontSize: 40,
    fontWeight: "bold",
    color: "blueviolet",
  },
  orderBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  }
});

export default CurrentOrder;
