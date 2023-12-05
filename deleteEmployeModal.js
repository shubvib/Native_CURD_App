import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

function deleteEmployeModal(props) {
  const {isOpen, closeModal, selectedEmployee, updataData} = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const deleteEmployee = () => {
    setLoading(true);
    axios
      .delete(
        `https://63bfef3ee262345656f3cbd9.mockapi.io/api/curd-app/NativeCURS/${selectedEmployee.id}`,
      )
      .then(() => {
        closeModal(true);
        updataData();
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage('Network Error. Please try again.');
      });
  };
  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="fade"
      transparent>
      <View style={styles.BackgroundContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            would you like to delete employee ({selectedEmployee.name})?
          </Text>
          <Text style={styles.subTitle}>
            If you are sure to delete this employee then click "Yes" button or
            if you are not willing to delete just click "No".
          </Text>

          {loading ? (
            <Text style={styles.message}>Please Wait...</Text>
          ) : errorMessage ? (
            <Text style={styles.message}>{errorMessage}</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={deleteEmployee}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: 10}} onPress={closeModal}>
              <Text style={{...styles.buttonText, color: 'skyblue'}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default deleteEmployeModal;

const styles = StyleSheet.create({
  BackgroundContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    width: '90%',
    padding: 15,
    maxHeight: '40%',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'tomato',
    fontSize: 17,
  },
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});
