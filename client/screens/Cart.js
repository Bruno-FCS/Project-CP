import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  removeFromCart,
} from "../redux_store/actions";

const Cart = ({ navigation }) => {
  //Constance/UseState Variables & Functions -------------------------------------------------

  const [inputPC, setInputPC] = useState("");
  const promoCode = "SHOP2024";
  const [discountPercent, setDiscountPercent] = useState("");
  const [error, setError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isDiscount, setIsDiscount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [creditCard, setCreditCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  //Promocode function --------------------------------
  const applyDiscount = () => {
    if (inputPC.toUpperCase() == promoCode) {
      setDiscountPercent(0.2);
      setIsDiscount(true);
      setError("");
      setConfirmationMessage("Promo Code discount applied!");
    } else {
      setDiscountPercent(0);
      setIsDiscount(false);
      setError("This promocode does not exist. Try again");
    }
  };
  // Clear cart alert and function --------------------

  let alertButtons = [
    {
      text: "Yes",
      onPress: () => {
        dispatch(emptyCart());
      },
    },
    {
      text: "No",
      onPress: () => {
        console.log(`return to cart interface`);
      },
    },
  ];

  //Calling cart from redux using useSelector & Calculations ---------------
  const addedCartItems = useSelector((state) => state.products.cart);

  let subtotal = 0;
  addedCartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let discount = discountPercent * subtotal;
  const shipping = addedCartItems.length > 0 ? 15 : 0;
  let totalBeforeTax = subtotal + shipping - discount;
  let tax = subtotal * 0.13;
  let total = totalBeforeTax + tax;

  //Render function for cart item flatlist ----------------------------------
  const cartItem = ({ item }) => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
          width: "100%",
        }}
      >
        {/* Image */}
        <View>
          <Image
            source={{ uri: item.image }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        {/* Title, Quantity and Quantity Controls */}
        <View style={{ alignItems: "center", width: 130 }}>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            {item.title.length > 40
              ? item.title.slice(0, 45) + "..."
              : item.title}
          </Text>

          {/* Add to Quantity */}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch(decreaseQuantity(item.id));
              }}
            >
              <View style={{ ...styles.quantityButton, marginRight: 10 }}>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  -
                </Text>
              </View>
            </TouchableOpacity>

            {/* Reduce from Quantity */}
            <Text style={{ marginRight: 10 }}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(increaseQuantity(item.id));
              }}
            >
              <View style={styles.quantityButton}>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            height: 80,
          }}
        >
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <TouchableHighlight
              underlayColor="#9F4146"
              onPress={() => {
                dispatch(removeFromCart(item.id));
              }}
            >
              <View style={{ margin: 5 }}>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "800",
                    color: "grey",
                    paddingLeft: 10,
                  }}
                >
                  x
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <Text style={styles.price}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.separator1} />
    </View>
  );

  // RETURNED INTERFACE --------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {addedCartItems.length == 0 ? (
          <Text
            style={{ textAlign: "center", fontSize: 22, fontWeight: "800" }}
          >
            Nothing in Cart...{" "}
          </Text>
        ) : (
          <>
            {/*  Clear cart & Alert----------------------------------------------*/}
            <View style={{ flex: 0.8 }}>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "CONFIRMATION",
                      `Are you sure you want to clear the cart?`,
                      alertButtons
                    );
                  }}
                >
                  <View
                    style={[styles.buttonPC, { backgroundColor: "#9F4146" }]}
                  >
                    <Text style={{ color: "#fff" }}>Clear</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.txt}>Shopping Cart</Text>
              </View>

              {/*  Items added to cart----------------------------------------------*/}

              <View
                style={{
                  alignItems: "center",
                }}
              >
                <FlatList
                  data={addedCartItems}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  renderItem={cartItem}
                />
              </View>
            </View>

            {/* PromoCode----------------------------------------------------------- */}
            <View style={{ flex: 1, marginTop: 70 }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#C1666B",
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "800" }}>
                    {" "}
                    Promo Code:
                  </Text>
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Enter Promo code"
                    value={inputPC}
                    onChangeText={setInputPC}
                  />

                  <TouchableOpacity onPress={applyDiscount}>
                    <View
                      style={[styles.buttonPC, { backgroundColor: "#9F4146" }]}
                    >
                      <Text style={[{ color: "#fff" }]}>Apply</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {isDiscount ? (
                  <View>
                    <Text style={{ color: "green" }}>
                      {confirmationMessage}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{ color: "red" }}>{error}</Text>
                  </View>
                )}

                {/*  Pricing details -----------------------------------------------------*/}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Subtotal:</Text>
                  <Text style={styles.price}>${subtotal.toFixed(2)}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Discount:</Text>
                  <Text style={styles.price}>-${discount.toFixed(2)}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Shipping & Handling:</Text>
                  <Text style={styles.price}>${shipping.toFixed(2)}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "grey",
                      width: "30%",
                      paddingTop: 10,
                      marginBottom: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Total Before Tax:</Text>
                  <Text style={styles.price}>${totalBeforeTax.toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Estimated GST/HST:</Text>
                  <Text style={styles.price}>${tax.toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 28, color: "#9F4146" }}>
                    Order Total:
                  </Text>
                  <Text style={styles.price}>${total.toFixed(2)}</Text>
                </View>

                <View style={{ justifyContentContent: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(!showModal);
                      setConfirmationMessage("");
                      setInputPC("");
                      setError("");
                    }}
                  >
                    <View
                      style={[styles.button, { backgroundColor: "#C1666B" }]}
                    >
                      <Text style={[{ color: "#fff" }]}>Check-Out</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            {/* Modal ---------------------------------------------------------------- */}
            <Modal
              animationType="slide"
              visible={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#F3E2E3",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.modalSubContainer} resizeMode="contain">
                  <ScrollView>
                    <Image
                      style={[{ width: 200, height: 100 }]}
                      source={require("../assets/blackWhiteLogo.png")}
                    />

                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 24, fontWeight: "800" }}>
                        Total Due:{" "}
                      </Text>
                      <Text style={{ fontSize: 24 }}>${total.toFixed(2)}</Text>
                    </View>
                    <Text>Enter your credit card information: </Text>

                    <TextInput
                      style={styles.modalInput}
                      placeholder="Name of Credit Card Holder"
                      keyboardType="name-phone-pad"
                      onChangeText={setName}
                      value={name}
                    />

                    <TextInput
                      style={styles.modalInput}
                      placeholder="Credit Card Number"
                      keyboardType="number-pad"
                      onChangeText={setCreditCard}
                      value={creditCard}
                    />
                    <TextInput
                      style={{ ...styles.modalInput, width: "40%" }}
                      placeholder="CVV ###"
                      onChangeText={setCvv}
                      keyboardType="number-pad"
                      value={cvv}
                    />
                    <Text style={{ color: "red" }}> {error}</Text>

                    <View style={{ alignItems: "center" }}>
                      <View style={{ justifyContentContent: "center" }}>
                        <TouchableOpacity
                          onPress={() => {
                            setError("");
                            if (
                              name.length > 0 &&
                              creditCard == 1234567812345678 &&
                              cvv == 111
                            ) {
                              setShowModal(!showModal);
                              dispatch(emptyCart());
                              Alert.alert(
                                "CONFIRMATION",
                                `Payment successful!`
                              );
                              navigation.navigate("Home");
                            } else
                              setError(
                                "Your credit card details are invalid, please try again"
                              );
                          }}
                        >
                          <View
                            style={[
                              styles.button,
                              { backgroundColor: "#C1666B" },
                            ]}
                          >
                            <Text style={[{ color: "#fff" }]}>Pay</Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{ justifyContentContent: "center" }}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(!showModal);
                            setError("");
                          }}
                        >
                          <View
                            style={[
                              styles.button,
                              { backgroundColor: "#9F4146" },
                            ]}
                          >
                            <Text style={[{ color: "#fff" }]}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E2E3",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  subContainer: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#C1666B",
    borderWidth: 2,
    borderRadius: 10,
    width: 384,
    padding: 20,
    justifyContent: "center",
  },

  txt: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 20,
  },

  separator1: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    width: "100%",
  },

  separator2: {
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    width: "80%",
  },

  img: {
    width: 60,
    height: 60,
    backgroundColor: "white",
  },

  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#C1666B",
    justifyContent: "center",
    alignItems: "center",
  },

  promoInput: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#F3E2E3",
    backgroundColor: "white",
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  price: {
    fontSize: 20,
  },

  button: {
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },

  buttonPC: {
    borderRadius: 5,
    //marginTop: 15,
    //marginBottom: 10,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    elevation: 10,
  },
  modalSubContainer: {
    flex: 1,
    marginVertical: 50,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#C1666B",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    width: "70%",
    height: "60%",
  },

  modalInput: {
    borderColor: "#C1666B",
    borderWidth: 0.75,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 18,
  },
});
