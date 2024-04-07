import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, Alert, Modal} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeFromCart,  } from "../redux_store/actions";

const Cart = ({ route, navigation }) => {

//Calculation & Alert Functions ------------------------------------------------------------


const [inputPC, setInputPC] = useState('')
const promoCode = "SHOP2024"
const [discountPercent, setDiscountPercent] = useState ('')
const [error,setError] = useState('')
const [confirmationMessage, setConfirmationMessage] = useState('')
const [isDiscount, setIsDiscount ] = useState(false)
const [itemQuantity, setItemQuantity] = useState(0)
const [showModal, setShowModal] = useState (false)
const dispatch = useDispatch()
const [creditCard, setCreditCard] = useState('')
const [cvc, setCvc] = useState('')




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

// Remove from cart function----------------------------------------------
const handleDelete= itemID =>{
  dispatch(removeFromCart)
}



//Calling cart from redux using useSelector & Calculations ---------------
const addedCartItems = useSelector(state => state.products.cart)

let subtotal =0
addedCartItems.forEach((item)=>{
  subtotal += (item["price"]* (itemQuantity==0? item.quantity : itemQuantity))
})

let discount = discountPercent* subtotal
const shipping = 15
let totalBeforeTax = (subtotal + shipping - discount)
let tax = subtotal* 0.13
let total = totalBeforeTax + tax

//Render function for cart item flatlist ----------------------------------
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
                  if ((itemQuantity ==0 && item.quantity ==1) || (itemQuantity == 1)) dispatch(removeFromCart(item.id))
                  else if(itemQuantity == 0 ) setItemQuantity(item.quantity - 1)
                  else setItemQuantity(itemQuantity-1)
                  // if (itemQuantity > 1 ) setItemQuantity(item.quantity - 1) //Need to add if statement function to delete from
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
      

      {/*  Clear cart & Alert----------------------------------------------*/}
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
        

        {/* PromoCode----------------------------------------------------------- */}

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
        
        {/*  Pricing details -----------------------------------------------------*/}
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Subtotal:</Text>
          <Text style={styles.price}>${(subtotal).toFixed(2)}</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Discount:</Text>
          <Text style={styles.price}>-${(discount).toFixed(2)}</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Shipping & Handling:</Text>
          <Text style={styles.price}>${(shipping).toFixed(2)}</Text>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <View style={{borderBottomWidth:2, borderBottomColor: 'grey', width:'30%', paddingTop:10, marginBottom:10 }}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Total Before Tax:</Text>
          <Text style={styles.price}>${(totalBeforeTax).toFixed(2)}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:20}}>Estimated GST/HST:</Text>
          <Text style={styles.price}>${(tax).toFixed(2)}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <Text style={{fontSize:28, color:'#9F4146'}}>Order Total:</Text>
          <Text style={styles.price}>${(total).toFixed(2)}</Text>
        </View>

        <View style={{justifyContentContent:'center'}}>
        <TouchableOpacity onPress={() =>setShowModal(!showModal)}>
          
          <View style={[styles.button, {backgroundColor:"#C1666B"}]}>
            <Text style={[{color: "#fff"}]}>Check-Out</Text>
          </View>

        </TouchableOpacity>
        </View>
      
      {/* Modal ---------------------------------------------------------------- */}
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={()=>{
            setShowModal(false)
        }}
      >
        <View style={styles.container}>
        <View style={styles.subContainer}>
            <TextInput
              placeholder="Credit Card Number"
              onChangeText={setCreditCard}
              value={creditCard}
            />
            <TextInput
              placeholder="CVC ###"
              onChangeText={setCvc}
              value={cvc}
            />
            <Text style={{color:'red'}}> {error}</Text>

            
            <Button 
            title="Pay"
            onPress={()=>{
                
                //Add Animation here as confirmation of successful payment?
                setError('')
                if(creditCard == 1234567812345678 & cvc == 111) setShowModal(!showModal)
                else setError('Your credit card is invalid, please try again')
            }}
            
            />

        </View>
        </View>
      </Modal>

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
    borderBottomWidth:0.5,
    borderBottomColor:'grey',
    width:'100%',
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