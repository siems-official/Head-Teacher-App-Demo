import { aiBot, colors } from "@/services";
import { FONTS } from "@/services/assets/fonts";
import { cn } from "@/services";
import { SendTextIcon } from "@/services";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import HeaderCommon from "@/components/shared/HeaderCommon";

const AskMeScreen = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const route = useRouter();
  const userId = 1; // gotta get from api
  const receiverId = route.params?.id_param || 2; // gotta get from api

  // useEffect(() => {
  //   socket.on("individual", (msg) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });
  // }, []);

  const handleContentSizeChange = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleMessageInsert = (textMessage) => {
    setInputText(textMessage);
  };

  const messageSendHandler = () => {
    if (userId && receiverId && inputText) {
      const data = {
        senderId: userId,
        receiverId: receiverId,
        message: inputText,
        attachment: "",
      };
      console.log("hi", data);
      // socket.emit("individual", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setInputText("");
    }
  };

  const renderMessage = ({ item, index }) => {
    // const isUserMessage = item?.sender === userId; // gotta get from api
    const isUserMessage = true;

    return (
      <View
        className={`max-w-full px-4 mb-${
          index === messages.length - 1 ? "6" : "2"
        }`}
      >
        <View
          className={cn(
            "w-full flex flex-row items-start gap-2",
            isUserMessage ? "justify-end" : "justify-start"
          )}
        >
          <View
            className={cn(
              isUserMessage
                ? "bg-main-100 rounded-lg rounded-tr-none"
                : "bg-neutral-200 rounded-tr-lg rounded-bl-lg",
              "px-3 py-2 mb-2 !max-w-[80%]"
            )}
          >
            <Text
              className="text-gray-900 text-base"
              style={{ ...FONTS.inter400 }}
            >
              {item?.message}
            </Text>
          </View>
          <View className="h-8 w-8 rounded-full bg-main-500 flex items-center justify-center">
            <Text
              className="text-sm font-normal !leading-[1.4] text-white-50 text-center"
              style={{ ...FONTS.inter400 }}
            >
              MJ
            </Text>
          </View>
        </View>
        {/* <Text
          className={`text-xs text-gray-500 mt-1 ${
            isUserMessage ? "self-end" : "self-start"
          }`}
        >
          {getTimeFromUnix(item?.createdAt)}
        </Text> */}
      </View>
    );
  };

  return (
    <View className="flex-1">
      <HeaderCommon title="Ask Me" showEditButton={false} />
      {messages.length === 0 && (
        <View className="flex-1 flex items-center justify-center">
          <Image source={aiBot} style={{ width: 150, height: 200 }} />
        </View>
      )}

      {messages.length > 0 && (
        <View className="flex-1 mt-4">
          <FlatList
            data={messages}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            renderItem={renderMessage}
            keyExtractor={(_, index) => `chat_message_${index}`}
            ref={scrollRef}
            onContentSizeChange={handleContentSizeChange}
            // contentContainerStyle={{ flex: 1 }}
          />
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className=""
      >
        <View className="flex-row items-center bg-white p-4">
          <View className="flex-row items-center bg-white border border-neutral-300 rounded-lg p-2 space-x-3">
            <TextInput
              className="flex-1 max-h-5 text-base px-2 py-0 text-black-700"
              placeholderTextColor={colors.text300}
              placeholder={
                messages.length > 0
                  ? "Type Here..."
                  : "Hello, How can I help you today?"
              }
              onChangeText={handleMessageInsert}
              value={inputText}
              style={{ ...FONTS.inter400 }}
            />
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={messageSendHandler}
              className="p-2"
            >
              <SendTextIcon
                color={inputText.length > 0 ? "#3B82F6" : "#A0A0A0"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AskMeScreen;
