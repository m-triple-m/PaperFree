import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, Card, Divider, IconButton } from "react-native-paper";

const CookingFood = ({ visible, setVisible }) => {

    const getOrderNum = () => {
        return '#'+(Math.floor(Math.random() * (999 - 100) + 100));
    }

  return (
    <Modal
      visible={visible}
    //   onRequestClose={(e) => setVisible(false)}
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <View style={styles.header}>
            <View style={{}}>
              <Text style={styles.title}>Order Placed</Text>
            </View>
            {/* <IconButton icon="close" onPress={(e) => setVisible(false)} /> */}
          </View>
          <Image style={{width: '100%', height: 300, marginVertical: 0, resizeMode: 'cover'}} source={{uri : 'https://cdn.dribbble.com/users/743832/screenshots/3971345/day67-68_cooking_tx.gif'}} />
            <Text style={{fontSize: 40, textAlign: 'center', fontWeight: 'bold'}}>Order No. {getOrderNum()}</Text>
            <Text style={{fontSize: 30, textAlign: 'center'}}>Your Food is Cooking... {"\n"}Please sit back and relax this won't take long</Text>
        </View>
        <Divider />
        <Button color="#fff" style={styles.orderBtn} onPress={e => setVisible(false)}>
          CANCEL ORDER
        </Button>
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
    justifyContent: "center",
    alignItems: "center",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    borderRadius: 10,
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
    backgroundColor: "#dc5a42",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default CookingFood;
