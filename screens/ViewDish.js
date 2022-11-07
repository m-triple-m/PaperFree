import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, Divider, IconButton, Snackbar } from "react-native-paper";
import { AirbnbRating, Rating } from "react-native-ratings";
import AntIcon from "react-native-vector-icons/AntDesign";

const ViewDish = ({
  visible,
  setVisible,
  menu,
  setCurrentOrder,
  currentOrder,
  app,
  fetchData,
}) => {
  // console.log(menu);

  const [selQty, setSelQty] = useState(0);
  const [selRating, setSelRating] = useState(4);
  const [showSnack, setShowSnack] = useState(false);

  // console.log(menu);

  const addQty = () => {
    setSelQty(selQty + 1);
  };

  const subQty = () => {
    if (selQty > 0) {
      setSelQty(selQty - 1);
    }
  };

  const addOrder = () => {
    let obj = currentOrder.find((m) => m.item.id === menu.id);
    if (obj) {
      if (selQty === 0) {
        console.log(currentOrder.filter((m) => m.item.id !== menu.id));
        setCurrentOrder(
          currentOrder.filter((m) => m.item.id !== menu.id) ?? []
        );
        console.log("remove");
        return;
      }
      obj.qty = selQty;
      setCurrentOrder([...currentOrder, obj]);
      console.log("update");
    } else {
      if (selQty === 0) return;
      setCurrentOrder([...currentOrder, { item: menu, qty: selQty }]);
      console.log("add");
    }
    setSelQty(0);
    setVisible(false);
  };

  const addReview = async (id, ratings, num) => {
    const db = getFirestore(app);
    const ref = doc(db, "menu", id);
    await setDoc(
      ref,
      {
        ratings: [...ratings, num],
      },
      { merge: true }
    );
    setShowSnack(true);
    fetchData();
  };

  const addOrderFooter = () => {
    return (
      <View style={styles.addOrderContainer}>
        <Button
          disabled={selQty === 0}
          textColor="#fff"
          icon="plus"
          mode={"contained"}
          onPress={addOrder}
          style={styles.btn}
        >
          Add Order
        </Button>

        {/* <View></View> */}
        <View style={styles.orderQtySelector}>
          <IconButton
            icon="minus"
            onPress={subQty}
            onLongPress={(e) => setSelQty(0)}
          />
          <Text style={styles.setQty}>{selQty} </Text>
          <IconButton icon="plus" onPress={addQty} />
        </View>
      </View>
    );
  };

  const calcAvg = (ratings = []) => {
    let sum = 0;
    ratings.forEach((r) => (sum += r));
    return sum / ratings.length;
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={(e) => setVisible(false)}
      animationType="slide"
    >
      <Snackbar
        visible={showSnack}
        onDismiss={() => setShowSnack(false)}
        action={{
          label: "Great",
          onPress: () => {
            // Do something
          },
        }}
      >
        Thanks🧡 for your Feedback!!
      </Snackbar>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{}}>
            <Text style={styles.title}>{menu.obj.title} </Text>
            <Text style={styles.category}>{menu.obj.type}</Text>
          </View>
          <IconButton icon="close" onPress={(e) => setVisible(false)} />
        </View>

        <Image source={{ uri: menu.obj.image }} style={styles.image} />
        <Text style={styles.description}>
          It is a combination of chana masala (spicy white chickpeas) and
          bhatura/puri, a deep-fried bread made from maida.
        </Text>
        {/* <View style={styles.avgRating}>
          <Text>{calcAvg(menu.obj.ratings)}</Text>
          <AntIcon name="star" />
        </View> */}
        <Text style={styles.price}>₹{menu.obj.price}/-</Text>
        <Text style={styles.qty}>per {menu.obj.qty}</Text>

        <View style={styles.rating}>
          <Text style={{}}>Rate this Item : </Text>
          <Divider style={{ marginTop: 5 }} />
          <AirbnbRating
            // type='heart'
            ratingCount={5}
            size={20}
            reviews={["Really...", "Bad", "Hmm...", "Great", "Yummy!!"]}
            defaultRating={selRating}
            showRating
            onFinishRating={(v) => setSelRating(v)}
          />
          <Button
            mode="contained"
            onPress={() =>
              addReview(
                menu.id,
                menu.obj.ratings ? menu.obj.ratings : [],
                selRating
              )
            }
          >
            Give Feedback
          </Button>
        </View>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    // backgroundColor: "green",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  description: {
    fontSize: 20,
    color: "#777",
    marginTop: 20,
    lineHeight: 30,
  },
});

export default ViewDish;
