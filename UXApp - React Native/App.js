
import { StyleSheet, Text, View,  TextInput,Button} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.body}>Login</Text>
      <Text style={styles.header}>Email: </Text>
      <TextInput style={styles.forminput} placeholder='Escriba su email' nativeID='email'></TextInput>
      <Text style={styles.header}>Constraseña: </Text>
      <TextInput style={styles.forminput} placeholder='Escriba su contraseña' nativeID='password'></TextInput>
      <Button style={styles.btnsubmit} title='Log in'></Button>
      <Button style={styles.btnsubmit} title='Sign up'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    fontsize: '14px',
    background: '#F58141',
    fontfamily: 'Poppins',
    textalign: 'center',
  },
  header:{
    fontsize: '14px',
    background: '#F58141',
    fontfamily: 'Poppins',
    textalign: 'left',
	  marginleft: '165px',
  },
  forminput: {
    background: '#E6E7E8',
    width: '60%',
    padding: '12px',
    marginbottom: '20px',
  },
  btnsubmit: {
    width: '50%',
    background: '#F58141',
    fontsize: '16px',
    border:'none',
    color:'#fff',
    padding: '15px 0',
    margin: '15px',
   },

});
