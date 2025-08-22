import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
export {RFValue as RF};
export {RFPercentage as RFP};
 const GST=StyleSheet.create({
  FLEXGROW:{
    flexGrow:1,
    
  },
  FLEX:{
    flex:1,
    backgroundColor:"#FFFFFF"
  
  },
    CENTER: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      SPACEBETWEEN: {
        justifyContent: 'space-between',
      },
      AlignSelf:{
   alignSelf:'center'
      },
      MAIN: {
        flex: 1,
        backgroundColor:"#FFFFFF",
        paddingHorizontal:RFValue(15)
      },
      MODALMAIN: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      ROW: {
        flexDirection: 'row',
      },
      mid_row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      COLUMN: {
        flexDirection: 'column',
      },
      FLEXWRAP: {
        flex: 1,
        flexWrap: 'wrap',
      },
      CENTERCONTAINER:{
       flexDirection:"row",
       justifyContent:"space-between",
       width:"100%",
       alignItems:"center"
      },
      heading:{
    fontSize:RFValue(50),
        color:"#202020",
        fontFamily:"Raleway-ExtraBold",
        
      },
      subHeading:{
        fontSize:RFValue(28),
        fontFamily:"Raleway-Bold",
        color:"#202020"
      },
      description:{
        fontSize:RFValue(19),
        color:"#202020",
        fontFamily:"NunitoSans-Regular",
      },
      subdescription:{
        fontSize:RFValue(15),
        color:"#202020",
        fontFamily:"NunitoSans-Regular",
      
      },
      smallesttxt:{
        fontSize:RFValue(10),
         color:"#202020",
        fontFamily:"NunitoSans-Regular",
      },
      btnTitle:{
        fontSize:RFValue(18),
        color:"#F3F3F3",
        fontFamily:"NunitoSans-Regular",
      
      },
      
      
});
export default GST
export const colors = {
  DarkWhite: '#FFFFFF',
  white: '#F3F3F3',
  Black: '#000000',
  dimBlack: '#808080',
  grey: '#F8F8F8',
  blue:"rgba(0, 76, 255, 1)",
  pink:"rgba(255, 87, 144, 1)",
  lightpink:"rgba(248, 206, 206, 1)",
  lightblue:"rgba(229, 235, 252, 1)",
  darkblack:"#202020",
  orange:"#FE7F00",
  green:"#08C514",
  darkgrey:"#F9F9F9"
};
