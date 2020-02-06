import StyleSheet from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 100,
    margin: 30,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  white: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 370,
    height: 300,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bigText: {
    fontSize: 80,
  },
});