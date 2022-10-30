import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";

const ViewDish = ({
  visible,
  setVisible,
  menu,
  setCurrentOrder,
  currentOrder,
}) => {
  // console.log(menu);

  const [selQty, setSelQty] = useState(0);

  const addQty = () => {
    setSelQty(selQty + 1);
  };

  const subQty = () => {
    if (selQty > 0) {
      setSelQty(selQty - 1);
    }
  };

  const addOrder = () => {
    
    let obj = currentOrder.find(m => m.item.id === menu.id);
    if(obj){
      if(selQty === 0){
        console.log(currentOrder.filter(m => m.item.id !== menu.id));
        setCurrentOrder(currentOrder.filter(m => m.item.id !== menu.id) ?? []);
        console.log('remove');
        return;
      }
      obj.qty = selQty;
      setCurrentOrder([...currentOrder, obj]);
      console.log('update');
    }else{
      if(selQty === 0) return;
      setCurrentOrder([...currentOrder, { item: menu, qty: selQty }]);
      console.log('add');
    }
    setVisible(false);
  };

  const addOrderFooter = () => {
    return (
      <View style={styles.addOrderContainer}>
        <Button
          icon="plus"
          mode="contained"
          onPress={addOrder}
          style={styles.btn}
        >
          Add Order
        </Button>

        {/* <View></View> */}
        <View style={styles.orderQtySelector}>
          <IconButton icon="plus" onPress={addQty} />
          <Text style={styles.setQty}>{selQty} </Text>
          <IconButton icon="minus" onPress={subQty} onLongPress={e => setSelQty(0)} />
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={(e) => setVisible(false)}
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{}}>
            <Text style={styles.title}>{menu.obj.title} </Text>
            <Text style={styles.category}>{menu.obj.type}</Text>
          </View>
          <IconButton icon="close" onPress={(e) => setVisible(false)} />
        </View>

        <Image source={{ uri: menu.obj.image }} style={styles.image} />
        <Text style={styles.price}>₹{menu.obj.price}/-</Text>
        <Text style={styles.qty}>per {menu.obj.qty}</Text>
      </View>
      {addOrderFooter()}
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
    height: 300,
    resizeMode: "cover",
    borderRadius: 20,
    marginTop: 20,
  },
  addOrderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  orderQtySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setQty: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: "green",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ViewDish;
