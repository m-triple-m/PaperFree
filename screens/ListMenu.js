import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query
} from "firebase/firestore";
import { Button, Card, IconButton, Paragraph, Title } from "react-native-paper";
import ViewDish from "./ViewDish";
import CurrentOrder from "./CurrentOrder";

const ListMenu = ({ app }) => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selMenu, setSelMenu] = useState(null);

  const [currentOrder, setCurrentOrder] = useState([]);
  const [showCurrentOrder, setShowCurrentOrder] = useState(false);

  const [selCat, setSelCat] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [catList, setCatList] = useState([
    {
      name: "Fast Food",
      value: "fast",
    },
    {
      name: "Starters",
      value: "starters",
    },
    {
      name: "Main Course",
      value: "main",
    },
    {
      name: "Desserts",
      value: "desserts",
    },
    {
      name: "Drinks",
      value: "drinks",
    },
  ]);

  const [orderChanges, setOrderChanges] = useState(1);

  const fetchData = (cb) => {
    setLoading(true);
    const db = getFirestore(app);
    const ref = collection(db, "menu");
    getDocs(ref).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        obj: doc.data(),
      }));
      // console.log(data);
      setMenuList(data);
      setLoading(false);
      // setTimeout(() => {
      // }, 3000);
    });
  };

  const getFilterData = (catIndex) => {
    if (selCat === null) return;
    console.log(catList[catIndex].value);
    setLoading(true);
    const db = getFirestore(app);
    const ref = collection(db, "menu");
    const q = query(
      ref,
      where("category", "==", catList[catIndex].value.toLocaleLowerCase())
    );
    getDocs(q).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        obj: doc.data(),
      }));
      console.log(data);
      setMenuList(data);
      setLoading(false);
      // setTimeout(() => {
      // }, 3000);
    });
  };

  const searchMenu = () => {
    if (searchText === "") return;
    setLoading(true);
    const db = getFirestore(app);
    const ref = collection(db, "menu");
    // const q = query(ref, where("name", "==", searchText));
    getDocs(ref).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        obj: doc.data(),
      }));
      console.log(data);
      setMenuList(data.filter(menu => menu.obj.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())));
      setLoading(false);
      // setTimeout(() => {
      // }, 3000);
    });
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  const openCard = (menuData) => {
    setSelMenu(menuData);
    setShowDetails(true);
  };

  const showCategory = () => {
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.catList}
        showsHorizontalScrollIndicator={false}
      >
        {catList.map((cat, index) => (
          <Button
            mode={selCat === index ? "contained" : "outlined"}
            key={cat.value}
            style={styles.catBtn}
            onPress={() => {
              setSelCat(index);
              getFilterData(index);
            }}
          >
            {cat.name}
          </Button>
        ))}
      </ScrollView>
    );
  };

  const menuCard = ({ id, obj }) => {
    return (
      <Card
        key={id}
        style={{ marginBottom: 10 }}
        onPress={(e) => openCard({ id, obj })}
      >
        <Card.Title title={obj.title} subtitle={obj.category} />

        <Card.Cover source={{ uri: obj.image }} />
        <Card.Content>
          <Text style={styles.price}>
            ₹{obj.price} per {obj.qty}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  const showMenu = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#00ff00" animating />;
    }

    return menuList.map((item) => menuCard(item));
  };

  const header = () => {

    return (
      <View style={styles.header}>
        <View style={styles.headertop}>
          <Text style={styles.headerTitle}>Menu Selector</Text>

          <IconButton icon="cart" onPress={(e) => setShowCurrentOrder(true)} />
        </View>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Menu"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          onSubmitEditing={searchMenu}
          
        />
        {showCategory()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {header()}
      {selCat !== null && (
        <Button
          onPress={() => {
            setSelCat(null);
            fetchData();
          }}
          contentStyle={{ flexDirection: "row-reverse" }}
          color="#777"
          style={{ width: "30%", marginLeft: 5 }}
          icon="close"
          mode="outlined"
        >
          {catList[selCat].name}
        </Button>
      )}
      <View style={styles.body}>
        <CurrentOrder
          visible={showCurrentOrder}
          setVisible={setShowCurrentOrder}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        />

        <ScrollView>{showMenu()}</ScrollView>
        {selMenu && (
          <ViewDish
          fetchData={fetchData}
            app={app}
            menu={selMenu}
            visible={showDetails}
            setVisible={setShowDetails}
            setCurrentOrder={setCurrentOrder}
            currentOrder={currentOrder}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  body: {
    flex: 1,
    // backgroundColor: "#fff",
    padding: 5,
  },
  searchBox: {
    backgroundColor: "#e3e8eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 50,
    marginBottom: 20,
    borderBottom: "none",
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  header: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
  },
  headertop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
  },
  catList: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginVertical: 10,
    // paddingVertical: 10,
  },
  catBtn: {
    margin: 5,
    borderRadius: 50,
  },
});

export default ListMenu;
