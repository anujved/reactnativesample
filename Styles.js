//Global imports
import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';


//File imports
import Colors from '../../Helper/Colors';
import Fonts from '../../Helper/Fonts';

export default StyleSheet.create({
    MainView:{
        paddingHorizontal:width(5),
        flex:1,
        backgroundColor:Colors.HOME_SCREEN_BACKGROUND
    },

    BackGroundImage:{
        height:height(65), 
        width:300,
        alignSelf:'center',
    },

    Container:{ flex: 1,
         marginHorizontal: 20 },

    InputContainer:{
        height:45,
        borderBottomWidth:1,
        borderColor:Colors.BLACK,
    },

    BottomView:{
        width:'100%',
        backgroundColor:Colors.WHITE,
        position: 'absolute',
        bottom:20,
        alignSelf:'center',
        borderRadius:15,
        shadowColor:Colors.BLACK,
        shadowRadius:1,
        shadowOffset:{height:1,width:1},
        shadowOpacity:0.1,
        padding:20,
        elevation:1
    },

    OnDemandButton:{
        height:50,
        width:'100%',
        borderWidth:1,
        borderColor:Colors.BORDER,
        borderRadius:10,
        marginBottom:10
    },

    LocationInput:{
        fontSize:15,
        fontFamily:Fonts.POPPINS_REGULAR,
        color:Colors.BLACK06
    }
})