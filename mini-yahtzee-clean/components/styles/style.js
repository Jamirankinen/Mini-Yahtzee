import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 45,
    marginBottom: 15,
    backgroundColor: '#40c40b',
    flexDirection: 'row',
    
  },
  footer: {
    backgroundColor: '#40c40b',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#40c40b",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },

  dicepoints:{
    flexDirection: 'row',
    width: 280,
    alignContent: 'center',


  },
  home: {
    alignItems: 'center',
    
  },

  text: {
    fontSize:20,
    padding: 10
  },
  butto:{
    backgroundColor: '#40c40b',
    padding: 10,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  rulestitle: {
    fontWeight: 'bold',
    fontSize:20

  },
  longtext: {
textAlign: 'center',
padding: 5

  },
  points: {
    fontSize: 20,
    paddingLeft: 13
  },
  goodluck: {
    fontSize:20,
    paddingBottom: 15
  },
  playertext: {
    padding: 5
  },
  totaltext: {
    fontSize: 25,
    paddingBottom: 10
  },
  bonpoints: {
    paddingBottom: 10
  }
});