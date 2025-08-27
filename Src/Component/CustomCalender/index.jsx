
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native"
import { Calendar } from "react-native-calendars"
import GST, { colors, RF } from "../../Constant"
import Leftarrow from "../../assets/SVG/Leftarrow.svg"
import Rightarrow from "../../assets/SVG/Rightarrow.svg"
import Downarrow from "../../assets/SVG/Downarrow.svg"


const CustomCalendar = ({visible,close}) => {
  const [selectedDate, setSelectedDate] = useState("2024-04-18")
  const [currentMonth, setCurrentMonth] = useState("2024-04")
//  const [visible, setVisible] = useState(false)

  
  // )
 const addMonths = (dateString, value) => {
  const [year, month] = dateString.split("-").map(Number);
  const newDate = new Date(year, month - 1 + value, 1);

  // Format as YYYY-MM manually (local safe)
  const newYear = newDate.getFullYear();
  const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
  return `${newYear}-${newMonth}`;
};

  const onDayPress = (day) => {
    setSelectedDate(day.dateString)
  }

  const onMonthChange = (month) => {
    setCurrentMonth(month.dateString.substring(0, 7))
  }

  const getMonthName = (dateString) => {
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "long" })
  }

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: colors.blue,
      selectedTextColor: colors.white,
    },
  }

  return (
 <Modal
 visible={visible}
        transparent={true}
        animationType="slide"   // "slide" | "fade" | "none"
        // onRequestClose={() => setVisible(false)}
 >
    <View style={styles.modalOverlay}>
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        {/* Custom Header */}
        <View style={[GST.ROW, GST.SPACEBETWEEN, styles.headerContainer]}>
          <TouchableOpacity style={styles.navButton}
           onPress={() => setCurrentMonth(addMonths(currentMonth, -1))}
          >
            <Leftarrow />
          </TouchableOpacity>

          <View style={styles.monthContainer}
           
          >
            <Text style={styles.monthText}>{getMonthName(currentMonth)}</Text>
          </View>

          <TouchableOpacity style={styles.navButton}
            onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <Rightarrow />
          </TouchableOpacity>
        </View>

        {/* Calendar Component */}
        <Calendar
  key={currentMonth}
  hideHeader={true}
  current={currentMonth + "-01"}
  onDayPress={onDayPress}
  onMonthChange={onMonthChange}
  markedDates={markedDates}
  hideArrows={true}
  hideExtraDays={true}
  disableMonthChange={false}
  firstDay={1}
  hideDayNames={true}
  showWeekNumbers={false}
  renderHeader={() => null}
  theme={{
    backgroundColor: colors.DarkWhite,
    calendarBackground: colors.DarkWhite,
    textSectionTitleColor: colors.darkblack,
    selectedDayBackgroundColor: colors.blue,
    selectedDayTextColor: colors.white,
    todayTextColor: colors.blue,
    dayTextColor: colors.darkblack,
    textDisabledColor: colors.dimBlack,
    dotColor: colors.blue,
    selectedDotColor: colors.white,
    arrowColor: colors.blue,
    disabledArrowColor: colors.dimBlack,
    indicatorColor: colors.blue,
  }}
  style={styles.calendar}

  // 👇 Custom day rendering
  dayComponent={({ date, state }) => {
    const isSelected = date.dateString === selectedDate;
    return (
      <TouchableOpacity
        style={[
          styles.dayCircle,
          isSelected && styles.selectedDayCircle
        ]}
        onPress={() => onDayPress(date)}
      >
        <Text
          style={[
            styles.dayText,
            state === "disabled" && styles.disabledText,
            isSelected && styles.selectedDayText
          ]}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  }}
/>


        {/* Bottom indicator */}
     
      </View>
         <TouchableOpacity style={styles.bottomIndicator}
        onPress={close}
        >
          <Downarrow/>
        </TouchableOpacity>
    </View>
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",  // dim background
    padding:RF(15),
    paddingTop:RF(45)
  },
  container: {
    ...GST.CENTER,
    // padding: RF(),
    // borderRadius:RF(20),
    
    
    
  },
  calendarWrapper: {
    backgroundColor: colors.DarkWhite,
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: RF(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: RF(8),
    elevation: 5,
    paddingBottom: RF(5),
    width: "100%",
    overflow:"hidden",
    borderRadius:RF(20)
    // maxWidth: RF(350),
  },
  headerContainer: {
    paddingHorizontal: RF(20),
    paddingVertical: RF(15),
    alignItems: "center",
  },
  navButton: {
    width: RF(30),
    height: RF(30),
    ...GST.CENTER,
    backgroundColor:colors.lightblue,
    borderRadius:RF(100)
  },
  monthContainer: {
    backgroundColor: colors.lightblue,
    paddingHorizontal: RF(50),
    paddingVertical: RF(8),
    borderRadius: RF(20),
    // minWidth: RF(100),
    ...GST.CENTER,
  },
  monthText: {
    fontSize: RF(16),
    color: colors.blue,
    fontFamily: "Raleway-Bold",
    textAlign: "center",
  },
  calendar: {
    paddingHorizontal: RF(10),
  },
  bottomIndicator: {
    height:RF(30),
    width:RF(30),
    ...GST.CENTER,
    borderRadius:RF(100),
    backgroundColor:colors.DarkWhite,
    alignSelf:"center",
    position:"absolute",
    bottom:RF(-15),
    elevation:5,
    zIndex:8
  },
  
  dayCircle: {
  width: RF(35),
  height: RF(35),
  borderRadius: RF(20),
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:colors.grey
},
selectedDayCircle: {
  backgroundColor: colors.blue,
},
dayText: {
  fontSize: RF(14),
  color: colors.darkblack,
  fontFamily: "Raleway-Bold",
},
selectedDayText: {
  color: colors.white,
},
disabledText: {
  color: colors.dimBlack,
},
})

export default CustomCalendar