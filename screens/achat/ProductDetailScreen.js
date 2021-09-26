import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import firebase from "firebase";
import UserAvatar from "react-native-user-avatar";
import * as articlesActions from "../../store/actions/articlesCommandes";
import Carousel from "react-native-anchor-carousel";
import ProfileScreen from "../profile/ProfileScreen";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;

const ProductDetailScreen = (props) => {
  const product = props.route.params.product;
  const dispatch = useDispatch();

  //-------------CAROUSEL----------------//

  let testData = [];
  testData.push({ id: "item1", image: product.downloadURL });

  if (product.downloadURL1) {
    testData.push({ id: "item2", image: product.downloadURL1 });
  }

  if (product.downloadURL2) {
    testData.push({ id: "item3", image: product.downloadURL2 });
  }

  if (product.downloadURL3) {
    testData.push({ id: "item4", image: product.downloadURL3 });
  }

  if (product.downloadURL4) {
    testData.push({ id: "item5", image: product.downloadURL4 });
  }

  console.log("test", testData);

  const carouselRef = React.useRef(null);

  function renderItem({ item, index, navigation }) {
    const { image, title, url } = item;
    return (
      <Pressable activeOpacity={1} style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PhotoArticleScreen", { image })}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
      </Pressable>
    );
  }

  //-----------------COMMENTAIRES-----------------//

  useEffect(() => {
    dispatch(articlesActions.getAvis(product.idVendeur));
  }, [dispatch]);

  let commentaires = useSelector((state) => state.commandes.commentaires);

  console.log('product', product);

  let ratings = [];
  for (let data in commentaires) {
    ratings.push(commentaires[data].rating);
  }


  let overallRating = 0;
  for (let data in ratings) {
    overallRating += parseInt(ratings[data]);
  }


  let trueRating;
  if (commentaires) {
    trueRating = Math.ceil(overallRating / commentaires?.length);
  }

  const [search, setSearch] = useState("");
  const [errorAdded, setErrorAdded] = useState("");

  const FourStar = () => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
      </View>
    );
  };
  const FiveStar = () => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
      </View>
    );
  };

  const ThreeStar = () => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
      </View>
    );
  };
  const TwoStar = () => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <AntDesign name="star" size={18} color="#FFC107" />
        <AntDesign name="star" size={18} color="#FFC107" />
      </View>
    );
  };

  const OneStar = () => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <AntDesign name="star" size={18} color="#FFC107" />
      </View>
    );
  };

  //------------------------CART--------------//

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        image: state.cart.items[key].image,
        idVendeur: state.cart.items[key].idVendeur,
        pseudoVendeur: state.cart.items[key].pseudoVendeur,
        pushToken: state.cart.items[key].pushToken,
        categorie: state.cart.items[key].categorie,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  const updateSearch = (search) => {
    setSearch(search);
  };

  //-----------------------------------MESSAGES---------------------//
  const idAcheteur = !props.loggedInAsVisit && firebase.auth().currentUser.uid;

  console.log(product.idVendeur, idAcheteur);

  const onMessagePressed = () => {
    console.log(product.pseudoVendeur);
    firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .doc(`${product.idVendeur}` + `${idAcheteur}`)
      .collection("MESSAGES")
      .add({
        text: `Start chating`,
        createdAt: new Date().getTime(),
        system: true,
      })
      .then(() => {
        firebase
          .firestore()
          .collection("MESSAGE_THREADS")
          .doc(`${product.idVendeur}` + `${firebase.auth().currentUser.uid}`)
          .set({
            latestMessage: { text: "Commencez à chatter..." },
            pseudoVendeur: product.pseudoVendeur,
            idVendeur: product.idVendeur,
            idAcheteur: firebase.auth().currentUser.uid,
            id: `${product.idVendeur}` + `${firebase.auth().currentUser.uid}`,
            reverse_id:
              `${firebase.auth().currentUser.uid}` + `${product.idVendeur}`,
          });
      });

    props.navigation.navigate("Message", {
      screen: "MessageScreen",
    });
  };

  const initial = product.pseudoVendeur.charAt(0);

  return (
    <View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imgContainer}>
            <Carousel
              keyExtractor={(item) => item?.id}
              style={[styles.carousel]}
              ref={carouselRef}
              data={testData}
              renderItem={({ item, index }) =>
                renderItem({ item, index, navigation: props.navigation })
              }
              itemWidth={ITEM_WIDTH}
              separatorWidth={SEPARATOR_WIDTH}
              inActiveScale={1}
              inActiveOpacity={1}
              containerWidth={windowWidth}
            />
          </View>
          <View style={styles.titleAndPrixContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.prix}>{product.prix} €</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <View style={styles.itemForm3}>
            <Text>Etat</Text>
            <Text>{product.etat}</Text>
          </View>
          <View style={styles.itemForm3}>
            <Text>Catégorie</Text>
            <Text>{product.categorie}</Text>
          </View>
          {product.marques && (
            <View style={styles.itemForm3}>
              <Text>Marque</Text>
              <Text>{product.marques}</Text>
            </View>
          )}
          <View style={styles.vendeurContainer}>
            {product.imageURL ? (
              <Image source={require("../../assets/photoProfile.png")} />
            ) : (
              <UserAvatar size={50} name={initial} />
            )}

            <View>
              <Text style={styles.pseudoVendeur}>{product.pseudoVendeur}</Text>
              {commentaires?.length ? (
                <View>
                  {trueRating === 1 && <OneStar />}
                  {trueRating === 2 && <TwoStar />}
                  {trueRating === 3 && <ThreeStar />}
                  {trueRating === 4 && <FourStar />}
                  {trueRating === 5 && <FiveStar />}
                </View>
              ) : (
                <Text>Aucun commentaire disponible</Text>
              )}
            </View>

            {commentaires?.length ? (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("AvisScreen", {
                    product: product,
                  })
                }
              >
                <Text>Voir les avis</Text>
              </TouchableOpacity>
            ) : (
              <Text />
            )}
          </View>

          {product.idVendeur === idAcheteur ? (
            <View>
              <TouchableOpacity
                style={styles.reset}
                onPress={() => {
                  props.navigation.navigate("Profil", {
                    screen: "ModifierAnnonceScreen",
                    params: { ...product, modify: true },
                  });
                }}
              >
                <Text style={styles.resetText}>Modifier mon offre</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.envoyerMessageContainer}
                onPress={() =>
                  props.loggedInAsVisit
                    ? props.setLoggedInAsVisit(!props.loggedInAsVisit)
                    : onMessagePressed()
                }
              >
                <Text style={styles.envoyerMessageText}>
                  Envoyer un message
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mettreEnVente}
                onPress={() => {
                  if (cartItems.length !== 0) {
                    for (const key in cartItems) {
                      console.log("wola");
                      console.log("id1", product.id);
                      console.log("id2", cartItems[key].productId);
                      if (product.id == cartItems[key].productId) {
                        setErrorAdded(
                          "Ce produit est déjà présent dans votre panier"
                        );
                      } else {
                        dispatch(cartActions.addToCart(product));
                      }
                    }
                  } else {
                    dispatch(cartActions.addToCart(product));
                  }
                }}
              >
                <Text style={styles.mettreEnVenteText}>Ajouter au panier</Text>
              </TouchableOpacity>
            </View>
          )}
          {errorAdded ? (
            <Text
              style={{
                marginBottom: 12,
                textAlign: "center",
                color: "#D51317",
              }}
            >
              {errorAdded}
            </Text>
          ) : (
            <Text />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
  },
  resetText: {
    color: "#D51317",
    textAlign: "center",
    fontSize: 18,
  },
  reset: {
    backgroundColor: "#fff",
    marginTop: "5%",
    marginLeft: "5%",
    width: windowWidth / 1.1,
    borderColor: "#D51317",
    paddingVertical: "5%",
    marginBottom: 15,
  },
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    paddingRight: "2%",
    alignItems: "center",
  },
  searchBar: {
    width: "80%",
    borderRadius: 80,
  },
  icon: {
    width: "10%",
    marginLeft: "5%",
  },
  searchBarInner: {
    borderRadius: 80,
  },
  imgContainer: {
    width: windowWidth,
    height: windowHeight / 3,
    marginTop: "3%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#EBEBEB",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  prix: {
    color: "#737379",
    fontWeight: "bold",
    fontSize: 17,
  },
  titleAndPrixContainer: {
    marginLeft: "5%",
  },
  descriptionContainer: {
    backgroundColor: "#E7E9EC",
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    marginTop: "5%",
  },
  description: {
    textAlign: "center",
  },
  itemForm3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginLeft: "5%",
    height: windowHeight / 14,
    alignItems: "center",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  mettreEnVente: {
    backgroundColor: "#D51317",
    marginTop: "5%",
    marginLeft: "5%",
    width: windowWidth / 1.1,
    paddingVertical: "5%",
  },
  mettreEnVenteText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  vendeurContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E7E9EC",
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    alignItems: "center",
  },
  pseudoVendeur: {
    color: "black",
    fontSize: 16,
  },
  envoyerMessageContainer: {
    borderWidth: 1,
    borderColor: "#D9353A",
    width: "50%",
    marginLeft: "25%",
    marginTop: "5%",
    alignItems: "center",
    borderRadius: 4,
  },
  envoyerMessageText: {
    color: "#D9353A",
    fontSize: 18,
  },
  carousel: {
    width: windowWidth,
    height: ITEM_WIDTH + 100,
    flexGrow: 0,
    marginBottom: 30,
  },
  item: {
    backgroundColor: "white",
    height: "98%",
    borderRadius: 5,
    borderColor: "#EAECEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  lowerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  lowerLeft: {
    width: "50%",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2127",
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 14,

    color: "#A0A0A0",
  },
  button: {
    width: "40%",
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#585B60",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#585B60",
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    marginHorizontal: 10,
    borderColor: "#A0A0A0",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    borderColor: "#A0A0A0",
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1C2127",
  },
});

export default ProductDetailScreen;
