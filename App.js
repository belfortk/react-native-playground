/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState} from 'react';
import axios from 'axios';

import PostLinkComponent from './PostLinkComponent';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  StatusBar,
  Button,
  Keyboard
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [subredditName, setSubredditName] = useState('');
  const [data, setData] = useState([])

  const handleSubredditNameChange = (event) => {
    setSubredditName(event)
  }

  const fetchSubredditData = () => {
    Keyboard.dismiss()
    axios.get(`https://reddit.com/r/${subredditName.trim() === "" ? "all" : subredditName}.json`)
      .then((res) => {
        const {data} = res;
          const listOfPostDataFromSub = data.data.children.map(post => {
            const {data} = post;
            return {
              title: data.title,
              username: data.author,
              comments: {
                total: data.num_comments,
                link: `https://www.reddit.com${data.permalink}`
              },
              upvotes: data.ups,
              downvotes: data.downs,
              thumbnail: data.thumbnail,
              link: data.url,
              hours: new Date(data.created_utc * 1000).getHours()
            };
          });
          setData(listOfPostDataFromSub);
        });
  }
  
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.searchSection}>
        <TextInput
          style={{height: 40, paddingHorizontal: 25}}
          placeholder="Search for subreddit"
          value={subredditName}
          onChangeText={handleSubredditNameChange}
        />
        <Button onPress={fetchSubredditData} title="See Subreddit"/>

        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
          {data.length ? data.map(post => <PostLinkComponent key={post.link} {...post}/>) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  searchSection: {
    borderBottomColor: "darkgrey",
    borderBottomWidth: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  }
});

export default App;
