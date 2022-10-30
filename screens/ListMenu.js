import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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

  const fetchData = () => {
    setLoading(true);
    const db = getFirestore(app);
    const ref = collection(db, "menu");
    getDocs(ref).then((snapshot) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const openCard = (menuData) => {
    setSelMenu(menuData);
    setShowDetails(true);
  }

  const menuCard = ({id, obj}) => {
    return (
      <Card key={id} style={{marginBottom: 10}} onPress={e => openCard({id, obj})}>
        <Card.Title
          title={obj.title}
          subtitle={obj.category}
          
        />
        
        <Card.Cover source={{ uri: obj.image }} />
        <Card.Content>
          <Text style={styles.price}>₹{obj.price} per {obj.qty}</Text>
        </Card.Content>
        
      </Card>
    );
  };

  const showMenu = () => {
    if(loading){
      return <ActivityIndicator size="large" color="#00ff00" animating />
    }

    return menuList.map((item) => (
      menuCard(item)
    ))
  }

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu Selector</Text>
        <IconButton icon="cart" onPress={e => setShowCurrentOrder(true)} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CurrentOrder visible={showCurrentOrder} setVisible={setShowCurrentOrder} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
      <Header />

      {selMenu && <ViewDish app={app} menu={selMenu} visible={showDetails} setVisible={setShowDetails} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder} />}
      <TextInput style={styles.searchBox} placeholder="Search Menu" />

      <ScrollView>
        {showMenu()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
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
  price : {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
  }
});

export default ListMenu;

