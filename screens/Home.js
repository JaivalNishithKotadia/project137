import React from 'react';
import axios from 'axios';
import {ListItem} from 'react-native-elements'
import { FlatList, StyleSheet, Text, View ,Alert, SafeAreaView} from 'react-native';


export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      listData:[],
      url:"http://localhost:5000"
    }
  }
  componentDidMount(){
    this.getStars()
  }
  getStars=()=>{
    const {url}=this.state
    
    axios.get(url).then(response=>{
      return this.setState({
        listData:response.data.data
      })
    })
    .catch(error=>{
      alert(error.message)
    })
  }

  renderItem=({item,index})=>(
    <ListItem
     key={index}
     title={`Star : ${item.name}`}
     subtitle={`Distance From Earth :${item.distance} `}
     titleStyle={styles.title}
     containerStyle={styles.listContainer}
     bottomDivider
     chevron
     onPress={()=>
    this.props.navigation.navigate("Details",{name:item.name})}
    />

  )


  keyExtractor=(item,index)=>index.toString()

  render(){
    
    const{listData}=this.state
    if(listData.length === 0){
      return(
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>
            Loading...
          </Text>
        </View>
      ) 
    }
    return(

      <View style={styles.container}>
        <SafeAreaView/>
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>
            Stars World
          </Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList 
           data={this.state.listData}
           renderItem={this.renderItem}
           keyExtractor={this.keyExtractor}
          />
          
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: "#edc988" }, 
  upperContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" }, 
  headerText: { fontSize: 30, fontWeight: "bold", color: "#132743" }, 
  lowerContainer: { flex: 0.9 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" }, 
  emptyContainerText: { fontSize: 20 }, 
  title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" }, 
  listContainer: { backgroundColor: "#eeecda" } 
});