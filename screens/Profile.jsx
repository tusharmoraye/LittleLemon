import { useState } from "react";
import {
  Pressable,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaskedTextInput } from "react-native-mask-text";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppCheckbox from "../components/AppCheckbox";

export default function Profile() {
  const [image, setImage] = useState(null);

  const [notificationStatuses, setNotificationStatuses] = useState({
    orderStatuses: true,
    passwordChanges: false,
    specialOffers: true,
    newsletter: false,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCheckboxValueChange = (key, value) => {
    setNotificationStatuses({
      ...notificationStatuses,
      [key]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.formTitle}>Personal Information</AppText>
      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Avatar</AppText>
        <View style={styles.avatarInputContainer}>
          <Pressable onPress={pickImage} style={styles.avatarContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <AppText style={styles.avatarText}>TM</AppText>
            )}
          </Pressable>
          <AppButton variant="secondary" onPress={pickImage}>
            Change
          </AppButton>
          <AppButton
            type="outline"
            variant="secondary"
            onPress={(_) => setImage(null)}
          >
            Remove
          </AppButton>
        </View>
      </View>
      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>First name</AppText>
        <TextInput
          autoCorrect={false}
          style={styles.formInput}
          placeholder="alan"
        />
      </View>

      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Last name</AppText>
        <TextInput
          autoCorrect={false}
          style={styles.formInput}
          placeholder="doe"
        />
      </View>

      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Email</AppText>
        <TextInput
          autoCorrect={false}
          style={styles.formInput}
          keyboardType="email-address"
          placeholder="alan@gmail.com"
        />
      </View>

      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Phone number</AppText>
        <MaskedTextInput
          mask="(999) 999-9999"
          placeholder="MM/DD/YYYY"
          value="(333) 999-7777"
          onChangeText={(value) => {
            console.log(value);
          }}
          keyboardType="phone-pad"
          style={styles.formInput}
          autoCorrect={false}
        />
      </View>

      <View style={[styles.formInputContainer, styles.notificationContainer]}>
        <AppText style={styles.formTitle}>Email notifications</AppText>
        <AppCheckbox
          checked={notificationStatuses.orderStatuses}
          setChecked={(value) => onCheckboxValueChange("orderStatuses", value)}
        >
          Order statuses
        </AppCheckbox>
        <AppCheckbox
          checked={notificationStatuses.passwordChanges}
          setChecked={(value) =>
            onCheckboxValueChange("passwordChanges", value)
          }
        >
          Password changes
        </AppCheckbox>
        <AppCheckbox
          checked={notificationStatuses.specialOffers}
          setChecked={(value) => onCheckboxValueChange("specialOffers", value)}
        >
          Special offers
        </AppCheckbox>
        <AppCheckbox
          checked={notificationStatuses.newsletter}
          setChecked={(value) => onCheckboxValueChange("newsletter", value)}
        >
          Newsletter
        </AppCheckbox>
      </View>

      <AppButton style={styles.logoutButton}>Log out</AppButton>

      <View style={styles.actionButtonsContainer}>
        <AppButton
          type="outline"
          variant="secondary"
          style={styles.actionButton}
        >
          Discard changes
        </AppButton>
        <AppButton variant="secondary" style={styles.actionButton}>
          Save changes
        </AppButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  avatarInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarText: {
    fontSize: 24,
  },
  formInputContainer: {
    marginTop: 16,
  },
  formInputLabel: {
    fontSize: 16,
    color: "#797979",
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#797979",
    fontSize: 16,
    marginTop: 8,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  notificationContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
  },
  logoutButton: { alignSelf: "stretch", marginTop: 32 },
  actionButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginTop: 32,
    marginBottom: 64,
  },
  actionButton: { flex: 1, alignSelf: "stretch" },
});
