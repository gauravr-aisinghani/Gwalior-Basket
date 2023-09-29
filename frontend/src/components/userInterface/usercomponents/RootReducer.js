const initialState={
    product:{}
}

function RootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case 'ADD_PRODUCT':
            state.product[action.payload[0]]=action.payload[1]  
            console.log('add product:',state.product)          
            return {product:state.product}
        case 'EDIT_PRODUCT':
                state.product[action.payload[0]]=action.payload[1]  
                console.log('add product:',state.product)          
                return {product:state.product}
        case 'DELETE_PRODUCT':
                   delete state.product[action.payload[0]] 
                           
                    return {product:state.product}   
        default:
            return {product:state.product}
    }
}
export default RootReducer