import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../Constant';
const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  card: {
    width: '100%',
    backgroundColor: colors.DarkWhite,
    borderRadius: RF(25),
    overflow: 'hidden',
    gap: RF(10),
    elevation: RF(5),
    paddingBottom: RF(50),
  },
  container: {
    paddingHorizontal: RF(20),
    flex: 1,
    ...GST.CENTER,
  },
  img:{
    height:RF(350),
    width:"100%",
    // resizeMode:"cover"
    overflow:"hidden"
  },
  dot:{
    height:RF(15),
    width:RF(15),
    borderRadius:RF(100),
    // gap:RF(20)

  },
  activeDot:{
    height:RF(15),
    width:RF(15),
    borderRadius:RF(100)
  },
  btn:{
    width:"60%",
    alignSelf:"center",
    paddingVertical:RF(13),
    marginTop:RF(10)
  }

});
export default styles;
