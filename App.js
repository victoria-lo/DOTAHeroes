import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  //const [heroes, setHeroes] = useState([]);
 
  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    const res = await fetch('https://api.opendota.com/api/heroes');
    const json = await res.json();
    setData(json);
    //setHeroes(json.slice());
  };
  

  const formatNames = (hero) => {
      let search = query.toLowerCase().replace(/ /g,"_");
      if(hero.name.startsWith(search, 14)){
        let heroName = hero.name.charAt(14).toUpperCase() + hero.name.slice(15);
        heroName = heroName.replace(/_/g, " ");
        return heroName;
      }else{ 
        data.splice(data.indexOf(hero), 1);
        return null;
      }
  }

  const updateQuery = (input) => {
    //setHeroes(data.slice());
    setQuery(input);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Hero</Text>
      <SearchBar
          onChangeText={updateQuery}
          value={query}   
          placeholder="Type Here..."
      />
      <FlatList data={data} keyExtractor = {(i)=>i.id.toString()} extraData = {query} 
      renderItem = {({item}) =>
        <Text style={styles.flatList}>{formatNames(item)}
        </Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginBottom: 45
  },
  heading:{
      marginTop: 50,
      marginBottom:10,
      marginLeft: 15,
      fontSize: 25
  },
  flatList:{
      paddingLeft: 15, 
      marginTop:15, 
      paddingBottom:15,
      fontSize: 20,
      borderBottomColor: '#26a69a',
      borderBottomWidth:1
  }
});
