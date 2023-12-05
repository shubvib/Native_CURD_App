import React, { useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AddEmployeModal from './AddEmployeModal';
import EditEmployeModal from './EditEmployeModal';
import DeleteEmployeModal from './deleteEmployeModal';
import axios from 'axios';

function App() {
  const [employe, setEmploye] = useState([]);
  const [isAddEmployeModalOpen, setIsAddEmployeModalOpen] = useState(false);
  const [isEditEmployeModalOpen, setIsEditEmployeModalOpen] = useState(false);
  const [isDeleteEmployeModalOpen, setIsDeleteEmployeModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const getData = () => {
    axios
      .get(
        'https://63bfef3ee262345656f3cbd9.mockapi.io/api/curd-app/NativeCURS',
      )
      .then(res => {
        setEmploye(res.data);
        setLoading(false);
        // console.warn(res.data);
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleAddEmployeeModal = () => {
    setIsAddEmployeModalOpen(!isAddEmployeModalOpen);

  };

  const toggleEditEmployeeModal = () => {
    setIsEditEmployeModalOpen(!isEditEmployeModalOpen);
  };

  const toggleDeleteEmployeeModal = () => {
    setIsDeleteEmployeModalOpen(!isDeleteEmployeModalOpen);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={toggleAddEmployeeModal}
          style={styles.button}>
          <Text style={styles.buttonText}>Add employee</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Employee Lists:</Text>
        {employe.map((data, index) => (
          <View style={styles.employeeListContainer} key={data.id}>
            <Text style={{...styles.listItem, color: 'tomato'}}>
              {index + 1}.
            </Text>
            <Text style={styles.name}>employee Name: {data.name}</Text>
            <Text style={styles.listItem}>employee Age: {data.age}</Text>
            <Text style={styles.listItem}>employee Salary: {data.salary}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleEditEmployeeModal();
                  setSelectedEmployee({data});
                }}
                style={{...styles.button, marginVertical: 0}}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  toggleDeleteEmployeeModal();
                  setSelectedEmployee({data});
                }}
                style={{
                  ...styles.button,
                  marginVertical: 0,
                  marginLeft: 10,
                  backgroundColor: 'tomato',
                }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {loading ? (
          <Text style={styles.message}>Please Wait...</Text>
        ) : errorMessage ? (
          <Text style={styles.message}>{errorMessage}</Text>
        ) : null}

        {/* AddEmployeeModal modal is open when add employee button is clicked */}
        {isAddEmployeModalOpen ? (
          <AddEmployeModal
            isOpen={isAddEmployeModalOpen}
            closeModal={toggleAddEmployeeModal}
           updataData={getData}

          />
        ) : null}

        {/* EditEmployeeModal modal is open when edit button is clicked in particular employee list*/}
        {isEditEmployeModalOpen ? (
          <EditEmployeModal
            isOpen={isEditEmployeModalOpen}
            closeModal={toggleEditEmployeeModal}
            selectedEmployee={selectedEmployee.data}
            updataData={getData}

          />
        ) : null}

        {/* DeleteEmployeeModal modal is open when delete button is clicked in particular employee list*/}
        {isDeleteEmployeModalOpen ? (
          <DeleteEmployeModal
            isOpen={isDeleteEmployeModalOpen}
            closeModal={toggleDeleteEmployeeModal}
            selectedEmployee={selectedEmployee.data}
            updataData={getData}

          />
        ) : null}
      </View>
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  employeeListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  listItem: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});
