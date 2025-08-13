// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import { Text } from "@ui-kitten/components";
// import { useState } from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";

// export default function TimePicker({ title, setingDate, fontSize }) {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const onChange = (event, selectedDate) => {
//     if (event.type === 'set') {
//       const currentDate = selectedDate || date;
//       setShowPicker(false);
//       setingDate(currentDate.toLocaleDateString())
//       return;
//     }
//     const currentDate = selectedDate || date;
//     setShowPicker(false);
//     setDate(currentDate);
//     // setingDate(currentDate.toLocaleDateString())
//   };

//   const showDatePicker = () => {
//     setShowPicker(true);
//   };

//   return (
//     <View >
//       <TouchableOpacity onPress={showDatePicker} style={styles.data}>
//         <Text>{title}</Text>
//       </TouchableOpacity>

//       {
//         showPicker && (
//           <DateTimePickerAndroid
//             value={date}
//             mode="date"
//             display="default"
//             onChange={onChange}

//           />
//         )
//       }

//     </View >
//   );
// }
// const styles = StyleSheet.create({
//   data: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     height: 35,
//   },
//   title:{
//     color: 'white',
//     padding: 5,
//     fontFamily: 'Barlow-Bold',
//   }
// });