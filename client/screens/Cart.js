import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, Alert} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeFromCart,  } from "../redux_store/actions";

const Cart = ({ route, navigation }) => {

//Calculation & Alert Functions ------------------------------------------------------------

const [discount, setDiscount]= useState ('')
const [subtotal, setSubtotal] = useState('')
const [totalPrice, setTotalPrice] = useState('')
const [inputPC, setInputPC] = useState('')
const promoCode = "SHOP2024"
const [discountPercent, setDiscountPercent] = useState ('')
const [error,setError] = useState('')
const [confirmationMessage, setConfirmationMessage] = useState('')
const [isDiscount, setIsDiscount ] = useState(false)
const [itemQuantity, setItemQuantity] = useState(0)
const dispatch = useDispatch()


//Promocode function --------------------------------
const applyDiscount=() =>{
  if ((inputPC).toUpperCase() == promoCode){
    setDiscountPercent(0.20)
    setIsDiscount(true)
    setError('')
    setConfirmationMessage('Promo Code discount applied!')
  }
  else{
    setDiscountPercent(0)
    setIsDiscount(false)
    setError('This promocode does not exist. Try again')
  }
}
// Clear cart alert and function --------------------

let alertButtons=[
  {
      text:"Yes",
      onPress:()=>{
          dispatch(emptyCart())
      }
  },
  {
      text:"No",
      onPress:()=>{
          console.log(`return to cart interface`)
      }
  },
]

// Remove from cart Function---------------------------
const handleDelete= itemID =>{
  dispatch(removeFromCart)
}

// const calculation = ()=>{
//   addedCartItems.map((item)=>(
//     <Text key={item,id}>{item.price}</Text>
//   ))
// }


//Calling cart from redux using useSelector ----------------------
const addedCartItems = useSelector(state => state.products.cart)

//Render function for cart item flatlist -------------------------
const cartItem = ({item}) =>(
    <View>
  <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center', marginBottom:5}}>
          
          {/* Image */}
          <View>
            <Image
            source={{ uri: item.image }}
            style={styles.img}
            resizeMode="contain"
            />
          </View>

          {/* Title, Quantity and Quantity Controls */}
          <View style={{alignItems:'center'}}>

            <Text style={{width:'60%', textAlign:'center', fontSize:10}}>{item.title}</Text> 

            {/* Add to Quantity */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <TouchableOpacity 
                onPress={() =>{
                  if(itemQuantity == 0) setItemQuantity(item.quantity + 1)
                  else setItemQuantity(itemQuantity+1)
                  }
                }
              >
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

              {/* Reduce from Quantity */}
              <Text style={{marginRight: 10}}>{itemQuantity== 0 ? item.quantity : itemQuantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  if(itemQuantity == 0 ) setItemQuantity(item.quantity - 1)
                  else setItemQuantity(itemQuantity-1)
                  // if (itemQuantity > 1 ) setItemQuantity(item.quantity - 1) //Need to add if statement function to delete from cart
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
            <Text style={styles.price}> ${itemQuantity==0? (item.price*item.quantity).toFixed(2) : (item.price*itemQuantity).toFixed(2) }</Text>
        </View>
          
        </View>
        <View style={styles.separator1}/>
        </View>
)




  return (

    <View style={styles.container}>
      <View style ={styles.subContainer}>

      <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity onPress={()=>{
            Alert.alert("CONFIRMATION!", `Are you sure you want to clear the cart?`, alertButtons)
            
          }} >
                <View style={[styles.buttonPC, {backgroundColor:"#9F4146"}]}>
                  <Text style={{color: "#fff"}}>Clear</Text>
                </View>
            </TouchableOpacity>
        </View>
        
        <View>
          <Text style={styles.txt}>Shopping Cart</Text>
        </View>

        {/*  Items added to cart----------------------------------------------*/}

        <View>
          <FlatList
            data={addedCartItems}
            keyExtractor={(item) => {return item.id}}
            renderItem={cartItem}
          />
        </View>
        

        {/* --------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={{flexDirection: 'row', backgroundColor:"#C1666B", margin:10, padding:5, alignItems:'center', justifyContent:'space-between'}}>
          <Text style={{color:'white', fontWeight:'800'}}> Promo Code:</Text> 
          <TextInput 
            style={styles.promoInput} 
            placeholder= "Enter Promo code"
            value={inputPC}
            onChangeText={setInputPC}
          />

          <TouchableOpacity onPress={applyDiscount}>
            <View style={[styles.buttonPC, {backgroundColor:"#9F4146"}]} >
              <Text style={[{color: "#fff"}]}>Apply</Text>
            </View>
        </TouchableOpacity>


        </View>
        {
          isDiscount?
          <View><Text style={{color:'green'}}>{confirmationMessage}</Text></View>
          :
          <View><Text style={{color:'red'}}>{error}</Text></View>

        }
        

        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Subtotal:</Text>
          <Text style={styles.price}>$0.00</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Discount:</Text>
          <Text style={styles.price}>$0.00</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Shipping & Handling:</Text>
          <Text style={styles.price}>$0.00</Text>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <View style={{borderBottomWidth:2, borderBottomColor: 'grey', width:'30%', paddingTop:10, marginBottom:10 }}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Total Before Tax:</Text>
          <Text style={styles.price}>$0.00</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Estimated GST/HST:</Text>
          <Text style={styles.price}>$0.00</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:28, color:'#9F4146'}}>Order Total:</Text>
          <Text style={styles.price}>$0.00</Text>
        </View>

        <View style={{justifyContentContent:'center'}}>
        <TouchableOpacity onPress={() =>{navigation.navigate('Home')}}>
          
          <View style={[styles.button, {backgroundColor:"#C1666B"}]}>
            <Text style={[{color: "#fff"}]}>Check-Out</Text>
          </View>

        </TouchableOpacity>
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
    fontSize: 20,
    textAlign:'center',
    paddingBottom: 20
  },
    

  separator1:{
    borderBottomWidth:2,
    width:'100%',
    opacity:'20%'
  },

  separator2:{
    borderBottomWidth:2,
    borderBottomColor: 'grey',
    width:'80%',    
  },

  img:{
    width:60,
    height:60,
    backgroundColor: 'white'
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

  price:{
    fontSize:20
  },

  button: {
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: "center",
    width: 200,
  },

  buttonPC: {
    borderRadius: 5,
    //marginTop: 15,
    //marginBottom: 10,
    padding: 6,
    justifyContent: 'center',
    alignItems: "center",
    width: 60,
    elevation: 10
  }

});