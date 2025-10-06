import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";

interface JobDetailModalProps {
  modalizeRef: React.RefObject<Modalize>;
  jobData?: any;
}

const JobDetailModal = ({ modalizeRef, jobData }: JobDetailModalProps) => {
    function handleCloseModal() { 
        modalizeRef?.current?.close()
    }
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={false}
      modalHeight={360}
      withHandle={true}
    >
      <View style={styles.modalEachJobBlock}>
        <View style={styles.blockCloseModalIcon}>
          <FontAwesome name="close" size={35} color="black" onPress={handleCloseModal}/>
        </View>
          </View>
          <View></View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalEachJobBlock: {
    padding: 13,
  },
    blockCloseModalIcon: {
        flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default JobDetailModal;
