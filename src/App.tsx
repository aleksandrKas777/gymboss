import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {handler} from "./google";

const getExercises = async (sheet: any) => {

    const arrExercises = await sheet.axios.get('values/A2:B')

    return arrExercises.data.values.map((item: Array<number | string>) => {
        return {id: item[0], name: item[1] || ''}
    })
}

const checkWeight = (str: string) => {

    if (str.slice(-1) === 'п') {
        return ({type: str.slice(-1), weight: str.slice(0, -1)})
    }
    return ({type: str.slice(-2), weight: str.slice(0, -2)})

}

const parseTrain = (arr: Array<string>) => {

    return arr.map((item: string) => {
        const trainArrStrings = item.split(' ')

        const trainArrObjects = trainArrStrings[1].split('--').map(item => {
            const arr = item.split('/')

            return {...checkWeight(arr[0]), count: +arr[1].slice(0, -1)}
        })
        return {exercise: trainArrStrings[0].slice(1), approaches: trainArrObjects}
    })
}
const getTrain = async (sheet: any) => {

    const arrExercises = await sheet.axios.get('values/D2:P')

    return arrExercises.data.values.map((item: Array<string>) => {
        // console.log(parseTrain(item.slice(1)))

        return {date: item[0], exercises: parseTrain(item.slice(1)) || []}
    })
}


function App() {
    const [sheet, setSheet] = useState(null)
    const [exercises, setExercises] = useState([])
    const [trains, setTrains] = useState([])
    console.log(trains)
    useEffect(() => {
        handler().then((response) => setSheet(response))

    }, [])

    useEffect(() => {
        if (sheet) {
            getExercises(sheet).then(response => setExercises(response))

            getTrain(sheet).then(response => setTrains(response))
        }

    }, [sheet])


    return (
        <div className="App">
            <header className="App-header">

            </header>

        </div>
    );
}

export default App;
