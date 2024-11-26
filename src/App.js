import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [musicData, setMusicData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals',{mode: 'no-cors' })
        let FestivalData = await res.json()
        console.log('FestivalData::', FestivalData)
        let musicFestivalData = []
        let bands = []
        FestivalData.map((data) => {
          data.bands.map((bandsData) => {
            let index = bands.indexOf(bandsData.recordLabel)
            if (index >= 0) {
              musicFestivalData[index].festival.push({ 'name': bandsData.name, 'festival': data.name })
            }
            else {
              musicFestivalData.push({ 'recordLabel': bandsData.recordLabel, 'festival': [{ 'name': bandsData.name, 'festival': data.name }] })
              bands.push(bandsData.recordLabel)
            }
          })
        })
        console.log('musicFestivalData::', musicFestivalData)

        musicFestivalData.sort((a, b) => {
          if (a.recordLabel < b.recordLabel) {
            return -1
          }
          if (a.recordLabel > b.recordLabel) {
            return 1
          }
        })


        musicFestivalData.map((data) => {
          data.festival.sort((a, b) => {
            if (a.festival < b.festival) {
              if (a.name < b.name) {
                return -1
              }
              if (a.name > b.name) {
                return 1
              }
            }
            if (a.festival > b.festival) {
              if (a.name < b.name) {
                return -1
              }
              if (a.name > b.name) {
                return 1
              }
            }
          })
        })

        console.log('Sorted musicData::', musicFestivalData)
        setMusicData(musicFestivalData)
      }
      catch (e) {
        console.log('Error occured while fetching data:', e)
      }

    }
    fetchData();


  }, [])

  console.log('musicData::', musicData)
  return (
    <div className="App">
      <h1>Music Festival Data</h1>
      <ul>
        {musicData.map((data) => (
          <div style={{ textAlign: 'left' }}>
            <br />
            <div><strong>Record Label: </strong>{data.recordLabel}</div>
            {data.festival.map((festivalData) => {
              return (
                <div>
                  <div style={{ marginLeft: '50px' }}><strong>Band Name: </strong>{festivalData.name}</div>
                  <div style={{ marginLeft: '100px' }}><strong>Festival Name: </strong>{festivalData.festival}</div>
                </div>
              )
            })}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
