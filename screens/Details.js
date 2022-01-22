import React from 'react';
import axios  from 'axios';
import {Card} from 'react-native-elements'
import { FlatList, StyleSheet, Text, View,Alert } from 'react-native';


export default class Details extends React.Component {
    constructor(props){
        super(props);
        this.state={
            details:{},
            
            url:`http:localhost:5000/star?name=${this.props.navigation.getParam("Star_name")}`
        }

    }
    componentDidMount(){
        this.getDetails()
    }
    getDetails=()=>{
        const {url}=this.state;
        axios.get(url).then(response=>{
        this.setDetails(response.data.data)
    })
    .catch(error=>{
      Alert.alert(error.message)
    })
    }

    setDetails=planetDetails=>{
    
        this.setState({
            details:planetDetails,
        })
    }


  render(){
    const { details } = this.state;
    if (details.specifications){
        return(
            <View style={styles.container}>
              <Card title={details.name} >
                <View>
                    <Text style={styles.cardItem}>
                        {`Distance from Earth : ${details.Distance}`}
                    </Text>
                    
                    <Text style={styles.cardItem}>
                        {`Gravity : ${details.Gravity}`}
                    </Text>
                    
                    <Text style={styles.cardItem}>
                        {`Mass : ${details.Mass}`}
                    </Text>
                    <Text style={styles.cardItem}>
                        {`Radius : ${details.Radius}`}
                    </Text>
                    
                </View>
                <View style={[styles.cardItem,{flexDirection:'column'}]}>
                    <Text>
                        {details.specifications ? `Specifications : `:""}
                    </Text>
                    {details.specifications.map((item,index)=>(
                        <Text key={index.toString()} style={{marginLeft:50}}>
                            {item}
                        </Text>
                    ))}
                </View>
            </Card>
        </View>
        )
    }
    return null
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cardItem:{
        marginBottom:10
    }
})
