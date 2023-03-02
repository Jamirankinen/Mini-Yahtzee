import React, {useState} from 'react';
import {  Text, View, Pressable, Keyboard, TextInput } from 'react-native';
import styles from '../components/styles/style';





export default Home = ({navigation}) => {
    const [playerName, setPlayerName] = useState();
    const [hasplayerName, setHasPlayerName] = useState(false);

const NBR_OF_DICES = 5;
 const NBR_OF_THROWS = 3;
 const MIN_SPOT = 1;
 const MAX_SPOT = 6;
 const BONUS_POINTS_LIMIT = 63;
 const BONUS_POINTS = 50;

   
    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }


    return(
        <View style={styles.home}>

            { !hasplayerName ? 
            <>
                <Text style={styles.text}>For scoreboard enter your name</Text>
                <TextInput onChangeText={setPlayerName} autoFocus={true}></TextInput>
                <Pressable onPress={()=> handlePlayerName(playerName)}>
                <Text style={styles.butto}>OK</Text>
                </Pressable>
            </>
            :

            <>
                <Text style={styles.rulestitle}>Rules of the game </Text> 
                <Text style={styles.longtext}>
THE GAME: Upper section of the classic Yahtzee
dice game. You have {NBR_OF_DICES} dices and
for the every dice you have {NBR_OF_THROWS} 
throws. After each throw you can keep dices in
order to get same dice spot counts as many as
possible. In the end of the turn you must select
your points from {MIN_SPOT} to {MAX_SPOT}.
Game ends when all points have been selected.
The order for selecting those is free.
</Text>

<Text style={styles.longtext}>
POINTS: After each turn game calculates the sum
for the dices you selected. Only the dices having
the same spot count are calculated. Inside the
game you can not select same points from
{MIN_SPOT} to {MAX_SPOT} again.
</Text>
<Text style={styles.longtext}>
GOAL: To get points as much as possible.
{BONUS_POINTS_LIMIT} points is the limit of
getting bonus which gives you {BONUS_POINTS}
points more.</Text>
                <Text style={styles.goodluck}>Goodluck, {playerName}!</Text>

                <Pressable onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                <Text style={styles.butto}>Play</Text>
                </Pressable>
            </>

            }
           
        </View>
    )
}
