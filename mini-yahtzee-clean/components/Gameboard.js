import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../components/styles/style';
import { Grid, Col } from 'react-native-easy-grid';
import { MAX_SPOT, NBR_OF_DICES, NBR_OF_THROWS, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';


let board = [];


export default Gameboard = ({ route }) => {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [playerName, setPlayerName] = useState('');

    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(NBR_OF_DICES).fill(0));

    const [allCho, setAllCho] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const [hasCho, setHasCho] = useState(true);
    const [throLeft, setThroLeft] = useState(false);
    const [hasSelc, setHasSelc] = useState(false);
    const [checkBonus, setCheckBonus] = useState(false);
    const [sum, setSum] = useState(0);
    const [pointsLeft, setPointsLeft] = useState(BONUS_POINTS_LIMIT);
    const [hasWin, setHasWin] = useState(false);
    const [bonStatus, setBonStatus] = useState('');



    const row = [];

    if (firstTime == false) {
        row.push(<MaterialCommunityIcons
            size={50}
            key='starticon'
            name="dice-4"
        />
        );
    }


    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }
    function getDicePointsColor(i) {
        if (selectedDicePoints[i]) {
            return "black";
        }
        else {
            return "#40c40b";
        }

    }

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points" + spot}>
                <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    const buttonsRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        buttonsRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                    onPress={() => selectDicePoints(diceButton)}
                    key={"buttonsRow" + diceButton}>
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={40}
                        color={getDicePointsColor(diceButton)}
                    ></MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }


    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "#40c40b";

    }

    function selectDice(i) {
        if (throLeft === false && hasWin === false) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        } else {
            setStatus("You have to throw dices first.");
        }
    }




    useEffect(() => {

        getDicePointsTotal();
        bonusPoints();
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices');
            setThroLeft(true);
            setHasSelc(false);


        }
        if (nbrOfThrowsLeft === 2 || nbrOfThrowsLeft === 1) {
            setStatus('Select and throw dices again');
            setThroLeft(false);
            setHasSelc(false);

        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }

        if (allCho === false && nbrOfThrowsLeft === 0) {
            setNbrOfThrowsLeft(0);
            setStatus('Select your points before next throw.');
            setHasCho(false);
            setHasSelc(true);

        }

        if (selectedDicePoints.every(x => x == true) === true) {
            setAllCho(true);
        }

        if (allCho === true && hasWin === false) {
            checkWinner();
        }

        if (allCho === true && sum >= BONUS_POINTS_LIMIT && pointsLeft <= 0) {
            setStatus('Game over. All points selected.');
            setHasWin(true);
            setSum(sum + BONUS_POINTS);
            setBonStatus('Congrats! Bonus points (50) added');
            setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        }

        if (hasWin === true) {
            console.log("reset");
            resetGame();
        }
    }, [nbrOfThrowsLeft]);

    function resetGame() {
        setSelectedDicePoints((new Array(MAX_SPOT).fill(false)));
        setAllCho(false);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setDicePointsTotal(new Array(NBR_OF_DICES).fill(0));
        setThroLeft(true);
        setPointsLeft(BONUS_POINTS_LIMIT);
        setHasWin(false);
    }

    function checkWinner() {
        setStatus('Game over. All points selected.');
        setHasWin(true);
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        if (pointsLeft <= 0) {
            setSum(sum + BONUS_POINTS);
        }
    }



    function throwDices() {
        setThroLeft(false);
        if (hasCho === true) {
            if (firstTime === false) {
                setFirstTime(true);
                row.splice(0, 1);
            }

            let spots = [...diceSpots];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {

                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    spots[i] = randomNumber;

                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
            setDiceSpots(spots);
            setStatus('Select and throw dices again');
        }
    }



    function selectDicePoints(i) {
        if (firstTime === true && hasSelc === true) {
            if (selectedDicePoints[i] === false) {
                setHasSelc(false);
                setHasCho(true);
                let selected = [...selectedDices];
                let selectedPoints = [...selectedDicePoints];
                let points = [...dicePointsTotal];
                if (!selectedPoints[i]) {
                    selectedPoints[i] = true;
                    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                    points[i] = nbrOfDices * (i + 1);
                    setDicePointsTotal(points);
                }
                selected.fill(false);
                setSelectedDices(selected);
                setSelectedDicePoints(selectedPoints);
                setNbrOfThrowsLeft(NBR_OF_THROWS);
                return points[i];

            } else {
                setStatus("You already selected points for " + (i + 1));
            }
        } else {
            setStatus("You have to throw dices first.");
        }
    }
    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function getDicePointsTotal() {
        let sum1 = dicePointsTotal.reduce((partialSum, a) => partialSum + a, 0);
        if (checkBonus === true) {
            sum1 = sum1 + BONUS_POINTS;
            setCheckBonus(false);
        }
        setSum(sum1);
        return sum1;
    }


    function bonusPoints() {
        const points = getDicePointsTotal();
        let bonu = BONUS_POINTS_LIMIT - points;
        if (bonu > 0) {
            setPointsLeft(bonu);
        } else if (bonu <= 0) {
            setPointsLeft(0);
            bonu = 0;
        }
        setBonStatus('You are ' + bonu + ' points away from bonus');
    }



    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    Throw dices
                </Text>
            </Pressable>
            <Text style={styles.totaltext}>Total: {sum}</Text>
            <Text style={styles.bonpoints}>{bonStatus}</Text>
            <View style={styles.dicepoints}><Grid>{pointsRow}</Grid></View>
            <View style={styles.dicepoints}><Grid>{buttonsRow}</Grid></View>
            <Text style={styles.playertext}>Player: {playerName}</Text>
        </View>
    )
}