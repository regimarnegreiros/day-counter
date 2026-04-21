import { View, TextInput , Text, FlatList,TouchableOpacity, Button, KeyboardAvoidingView, Platform} from "react-native";


export const Input = props => (
    <View>
        {props.required === false?(<Text>{props.name}</Text>):(<Text>{props.name} <Text style={{color:'#FB2C36'}}>*</Text></Text>)}
        <TextInput
        style={styles.inputField}
        placeholder={props.placeholder}
        onChangeText={text => props.set(text)}
        value={props.text}
        maxLength={props.maxLength}
        />
    </View>
);
export const TextArea = props =>(
    <View>
        {props.required === false?(<Text>{props.name}</Text>):(<Text>{props.name} <Text style={{color:'#FB2C36'}}>*</Text></Text>)}
        <TextInput
        multiline
        numberOfLine={4}
        style={[styles.inputField,{height: 'auto', maxHeight: 100}, props.style]}
        placeholder={props.placeholder}
        onChangeText={text => props.set(text)}
        value={props.text}
        />
    </View>
);

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
        inputField: {
            borderColor: '#61616194',
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: 'solid',
            height: 40
        }
    });