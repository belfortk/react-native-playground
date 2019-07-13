import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.object,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequireds,
  thumbnail: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  hours: PropTypes.number.isRequireds
};


const PostLinkComponent = (props) => {
  return (
    <View style={styles.sectionContainer}>
      <TouchableHighlight onPress={() => Linking.openURL(props.link)}>
        <Image source={{uri: props.thumbnail ? props.thumbnail : ''}}
        style={styles.thumbnail} />
      </TouchableHighlight>
      <View style={styles.postTextContainer}>
        <View style={styles.postTitleContainer}>
        <Text onPress={() => Linking.openURL(props.link)} style={styles.postTitle}> {props.title} </Text>
        </View>
        <Text style={styles.postMetaData}>
          submitted {props.hours} hours ago by {props.username}
        </Text>
        <Text onPress={() => Linking.openURL(props.comments.link)} style={styles.postComments}> {props.comments.total} comments     {props.upvotes}▲  {props.downvotes}▼</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    paddingHorizontal: 10,
    
  },
  postTextContainer: {
    paddingHorizontal: 5,
    width: 0,
        flexGrow: 1,
        flex: 1,
  },
  postTitleContainer:{
    paddingRight: 10
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black
  },
  postMetaData: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark,
    paddingRight: 15
  },
  postComments: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  thumbnail: {width: 60, height: 60}
});

PostLinkComponent.propTypes = propTypes;
export default PostLinkComponent;
