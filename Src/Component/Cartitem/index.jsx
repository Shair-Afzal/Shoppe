import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import GST, { colors, RF } from "../../Constant";
import Deleteicon from '../../assets/SVG/Deleteicon.svg';
import Add from '../../assets/SVG/Add.svg'

const CartItem = ({
  productImage = require("../../assets/Images/cartimg.png"),
  title = 'Lorem ipsum dolor sit amet \nconsectetur.',
  price = '$17.00',
  selectedColor = 'Pink',
  selectedSize = 'M',
  onDelete,
  onColorSelect,
  onSizeSelect,
}) => {
  const TrashIcon = () => <Deleteicon height={RF(20)} width={RF(20)} />;

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={ productImage}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>{price}</Text>
        <View style={styles.optionsContainer}>
          <View style={{ ...GST.ROW, gap: RF(12) }}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                styles.colorOption,
                selectedColor === 'Pink' && styles.selectedOption,
              ]}
              onPress={() => onColorSelect && onColorSelect('Pink')}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedColor === 'Pink' && styles.selectedOptionText,
                ]}
              >
                Pink
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                styles.sizeOption,
                selectedSize === 'M' && styles.selectedOption,
              ]}
              onPress={() => onSizeSelect && onSizeSelect('M')}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSize === 'M' && styles.selectedOptionText,
                ]}
              >
                M
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
          <Add height={25} width={RF(25)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    ...GST.ROW,
    borderRadius: RF(12),
    gap: RF(15),
    width: '100%',
  },
  imageContainer: {
    width: RF(120),
    height: RF(110),
    padding: RF(3),
    borderRadius: RF(12),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderRadius: RF(10),
    backgroundColor: colors.lightpink,
  },
  deleteButton: {
    position: 'absolute',
    bottom: RF(22),
    left: RF(15),
    width: RF(32),
    height: RF(32),
    borderRadius: RF(16),
    backgroundColor: colors.DarkWhite,
    ...GST.CENTER,
  },

  productDetails: {
     height:RF(110),
     width:RF(180),
    justifyContent:"space-between",
    borderRadius:RF(12)
  },
  productTitle: {
    ...GST.smallesttxt,
    color: colors.darkblack,
    fontSize: RF(12),
  },
  productPrice: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    color: colors.darkblack,
  },
  optionsContainer: {
    ...GST.CENTERCONTAINER,
    width: '100%',
  },
  optionButton: {
    paddingHorizontal: RF(15),
    paddingVertical: RF(4),
    borderRadius: RF(8),
    ...GST.CENTER,
  },
  colorOption: {
    backgroundColor: colors.lightblue,
  },
  sizeOption: {
    backgroundColor: colors.darkgrey,
  },
  selectedOption: {
    backgroundColor: colors.lightblue,
  },
  optionText: {
    ...GST.subdescription,
    fontFamily: 'NunitoSans-Regular',
    color: colors.darkblack,
  },
  selectedOptionText: {
    color: colors.darkblack,
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default CartItem;
