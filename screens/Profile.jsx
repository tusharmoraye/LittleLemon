import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppCheckbox from "../components/AppCheckbox";
import Toast from "react-native-root-toast";

export default function Profile({ navigation }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
    notificationStatuses: {
      orderStatuses: false,
      passwordChanges: false,
      specialOffers: false,
      newsletter: false,
    },
  });

  useEffect(() => {
    (async () => {
      const userProfile = await AsyncStorage.getItem(
        "@LittleLemon:userProfile"
      );
      if (userProfile) {
        setUser(JSON.parse(userProfile));
        return;
      }

      const user = await AsyncStorage.getItem("@LittleLemon:user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUser((user) => ({ ...user, ...parsedUser }));
      }
    })();
  }, []);

  const handleInputChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("image", result.assets[0].uri);
    }
  };

  const onCheckboxValueChange = (key, value) => {
    handleInputChange("notificationStatuses", {
      ...user.notificationStatuses,
      [key]: value,
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@LittleLemon:user");
    await AsyncStorage.removeItem("@LittleLemon:userProfile");
    navigation.pop();
    navigation.replace("Onboarding");
  };

  const handleDiscard = () => {
    navigation.goBack();
  };
  const handleSave = () => {
    AsyncStorage.setItem("@LittleLemon:userProfile", JSON.stringify(user));
    Toast.show("Profile saved!");
    navigation.goBack();
  };

  const notificationStatuses = user.notificationStatuses || {};

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
      <AppText style={styles.formTitle}>Personal Information</AppText>
      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Avatar</AppText>
        <View style={styles.avatarInputContainer}>
          <Pressable onPress={pickImage} style={styles.avatarContainer}>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.avatarImage} />
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
            onPress={(_) => handleInputChange("image", "")}
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
          value={user.firstName}
          onChangeText={(value) => {
            handleInputChange("firstName", value);
          }}
        />
      </View>

      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Last name</AppText>
        <TextInput
          autoCorrect={false}
          style={styles.formInput}
          placeholder="doe"
          value={user.lastName}
          onChangeText={(value) => {
            handleInputChange("lastName", value);
          }}
        />
      </View>

      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Email</AppText>
        <TextInput
          autoCorrect={false}
          style={styles.formInput}
          keyboardType="email-address"
          placeholder="alan@gmail.com"
          value={user.email}
          onChangeText={(value) => {
            handleInputChange("email", value);
          }}
        />
      </View>

      <View style={styles.formInputContainer}>
        <AppText style={styles.formInputLabel}>Phone number</AppText>
        <MaskedTextInput
          mask="(999) 999-9999"
          placeholder="(999) 999-9999"
          value={user.phoneNumber}
          onChangeText={(value) => {
            handleInputChange("phoneNumber", value);
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

      <AppButton style={styles.logoutButton} onPress={handleLogout}>
        Log out
      </AppButton>

      <View style={styles.actionButtonsContainer}>
        <AppButton
          type="outline"
          variant="secondary"
          style={styles.actionButton}
          onPress={handleDiscard}
        >
          Discard changes
        </AppButton>
        <AppButton
          variant="secondary"
          style={styles.actionButton}
          onPress={handleSave}
        >
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
    fontFamily: "Karla",
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
