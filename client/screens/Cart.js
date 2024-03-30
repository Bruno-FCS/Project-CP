import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";

//Calling cart from redux using useSelector
const Cart = ({ route, navigation }) => {

const [discount, setDiscount]= useState ('')
const [subtotal, setSubtotal] = useState('')
const [totalPrice, setTotalPrice] = useState('')
const promoCode = "SHOP2024"
const [isDiscount, setIsDiscount ] = useState('')
const [itemQuantity, setItemQuantity] = useState('')
const quantity = 0


const cartItem = ({item}) =>(
    
  <View>
    <View>
      <Text style={styles.img}>Image Div here</Text>
    </View>
    <View>
      <Text>Item Name</Text> 
      
      <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <View style={{ ...styles.quantityButton, marginRight: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginRight: 10,
            }}
          >
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}
          >
            <View style={styles.quantityButton}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </View>
          </TouchableOpacity>
        </View>


    </View>
    <View>
    <Text>Price</Text>
    </View>
  </View>
)


// const calculations=()=>{

// }



  return (

    <View style={styles.container}>
      <View style ={styles.subContainer}>
        <View>
          <Text style={styles.txt}>Shopping Cart</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          
          <View>
            <Text style={styles.img}>Image Div here</Text>
          </View>


          <View>

            <Text>Item Name</Text> 

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <View style={{ ...styles.quantityButton, marginRight: 10 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    +
                  </Text>
            </View>
              </TouchableOpacity>
              <Text style={{marginRight: 10}}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              >
                <View style={styles.quantityButton}>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    -
                  </Text>
                </View>
            </TouchableOpacity>
          </View>

        </View>

        <View>
            <Text style={{fontSize:22}}>$0.00</Text>
        </View>



          
        </View>

        <View style={{flexDirection: 'row', backgroundColor:"#C1666B", margin:10, padding:5, alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'800'}}> Promo Code:</Text> 
          <TextInput style={styles.promoInput} placeholder= "Enter Promocode"/>
        </View>

     
      



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
    flex:1,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#C1666B",
    borderWidth: 2,
    borderRadius: 10,
    width: 384,
    padding: 20,
  },

  txt: { 
    fontWeight: "bold", 
    fontSize: 20 },

  separator1:{
    borderBottomWidth:2,
    width:'80%',    
  },
  separator2:{
    borderBottomWidth:2,
    borderBottomColor: 'grey',
    width:'80%',    
  },
  img:{
    width:60,
    height:60,
    backgroundColor: 'grey'
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#C1666B",
    justifyContent: "center",
    alignItems: "center",
  },

  promoInput:{
    borderRadius:10,
    borderWidth:0.5,
    borderColor:"#F3E2E3",
    backgroundColor: 'white',
    marginLeft: 10,
    paddingLeft:10,
    paddingRight:10



  },

});