import React, {useEffect, useState} from 'react';
import './App.css';
import {handler} from "./google";


const checkWeight = (str: string) => {

    if (str.slice(-1) === 'п') {
        return ({type: str.slice(-1), weight: str.slice(0, -1)})
    }
    return ({type: str.slice(-2), weight: str.slice(0, -2)})
}
const parseTrain = (trainString: string) => {

    return trainString.split('--').map(item => {
        const arr = item.split('/')

        return {...checkWeight(arr[0]), count: +arr[1].slice(0, -1)}
    })
}

const getTrains = (arr: Array<Array<string>>) => {

    return arr.map((item: Array<string>) => ({
        date: item[0],
        train: item.slice(1).map((item: string, index: number) => ({
            exercise: index,
            result: item
        })).filter((item) => !(item.result === ''))
            .map(item => ({date: item.exercise, result: parseTrain(item.result)}))
    }))
}


const getDataSheet = async (sheet: any) => {

    const dataSheet = await sheet.axios.get('values/A1:ZZ?majorDimension=COLUMNS')
    const {data: {values}} = dataSheet
    const exercises = values[0].slice(1).map((item: string, index: number) => ({id: index, name: item}))
    const trains = getTrains(values.slice(1))

    return {trains, exercises}
}


function App() {
    const [sheet, setSheet] = useState(null)
    const [dataSheet, setDataSheet] = useState<object | null>(null)
    console.log(dataSheet)
    useEffect(() => {
        handler().then((response) => setSheet(response))

    }, [])

    useEffect(() => {
        if (sheet) {
            getDataSheet(sheet).then(response => setDataSheet(response))

            // getTrain(sheet).then(response => setTrains(response))
        }
        return () => setSheet(null)
    }, [sheet])


    return (
        <div className="App">
            <header className="App-header">

            </header>

        </div>
    );
}

export default App;
