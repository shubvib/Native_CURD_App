import React, { useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

function AddEmployeModal(props) {

  const {isOpen, closeModal, updataData} = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [employe, setEmploye] = useState({
    name:"",
    salary:"",
    age:"",
  });

const addEmploye = () =>{
    setLoading(true);
    if(employe.name && employe.age && employe.salary){
    axios.post('https://63bfef3ee262345656f3cbd9.mockapi.io/api/curd-app/NativeCURS',employe)
    .then((res)=>{
    closeModal(true);
    updataData();
    })
    .catch((err)=>{
      setLoading(false);
      setErrorMessage("Network Error. Please try again.");
    })
  }else{
    setLoading(false);
    setErrorMessage("Fields can not be empty");
  }
}

  return (
    <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add New Employee</Text>

        <TextInput
          style={styles.textBox}
          onChangeText={(e) => setEmploye({...employe, name:e})}
          placeholder="Full Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.textBox}
          onChangeText={(e) => setEmploye({...employe, salary:e})}
          placeholder="salary"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.textBox}
          onChangeText={(e) => setEmploye({...employe, age:e})}
          placeholder="Age"
        />

        {loading ? <Text
            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                style={styles.message}>{errorMessage}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={addEmploye}
            style={{...styles.button, marginVertical: 0}}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={closeModal}
            style={{
              ...styles.button,
              marginVertical: 0,
              marginLeft: 10,
              backgroundColor: 'tomato',
            }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default AddEmployeModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
    backgroundColor: 'black',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});
