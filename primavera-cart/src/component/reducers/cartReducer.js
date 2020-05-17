import BathRobe from '../../images/BathRobe.jpg'
import BathTowel  from '../../images/BathRobe.jpg'
import Bedset from '../../images/Bedset.jpg'
import bedSet from '../../images/bedSet.jpg'
import BedSet1 from '../../images/BedSet1.jpg'
import TableCloth from '../../images/TableCloth.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'', desc: "", price:70,img:BathRobe},
        {id:2,title:'', desc: "", price:50,img:BathRobe },
        {id:3,title:'', desc: "",price:25,img: Bedset},
        {id:4,title:'', desc: "", price:85,img:bedSet},
        {id:5,title:'', desc: "", price:70,img:BedSet1 },
        {id:6,title:'', desc: "",price:90,img:TableCloth }
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   

    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
        
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
         
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
       
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
  
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
       
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 5
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 5
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer