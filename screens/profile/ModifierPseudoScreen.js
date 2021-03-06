import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {Formik} from "formik";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axios from 'axios';
import {BASE_URL} from "../../constants/baseURL";

const ModifierPseudoScreen = (props) => {

    const initialValues = {
        initial: '',
        confirmed: ''
    }

    const userData = props.route.params.user


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pseudo</Text>
            <Text style={{fontSize: 18, marginBottom: '10%'}}>Actuel : <Text style={{color: '#D51317', fontSize: 16}}>{userData.pseudo}</Text></Text>

            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    console.log(values)
                    await axios.put(`${BASE_URL}/api/users`, {
                        id: userData._id,
                        pseudo: values.initial
                    }).then(() => props.navigation.navigate('InformationsScreen'))
                }}
            >
                {props => (
                    <View>
                        <Text>Nouveau pseudo</Text>
                        <TextInput
                            placeholder="Pseudo"
                            style={styles.input}
                            value={props.values.initial}
                            onChangeText={props.handleChange('initial')}
                        />
                        <Text>Confirmer votre nouveaux pseudo</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Pseudo"
                            value={props.values.confirmed}
                            onChangeText={props.handleChange('confirmed')}
                        />
                        <TouchableOpacity
                            style={styles.mettreEnVente}
                            onPress={props.handleSubmit}
                        >
                            <Text style={styles.mettreEnVenteText}>Confirmer la modification</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

        </View>
    );
};


const styles = StyleSheet.create({
    mettreEnVente: {
        backgroundColor: "#D51317",
        marginTop: '5%',
        marginLeft: '5%',
        width: windowWidth/1.1,
        paddingVertical: '5%'
    },
    mettreEnVenteText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    container: {
        paddingHorizontal: '6%',
        paddingVertical: '7%',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        textAlign: 'justify',
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#A7A9BE',
        paddingVertical: '4%',
        borderRadius: 5,
        paddingHorizontal: '3%',
        marginBottom: '5%',

    }
});

export default ModifierPseudoScreen;
